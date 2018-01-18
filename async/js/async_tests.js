expect = chai.expect;

describe('a fake fb_api', () => {
    it('couples an id with a random chosen individual', () => {
        return fb_api([1, 2, 125])
            .then(fb_members => {
                expect(fb_members[2].id).to.be.eql(125);
                expect(Object.keys(namesAndGenders).includes(fb_members[0].name));
            });
    });
});

describe('a fake gender module', () => {
    it('filters fb members by their gender', () => {
        return genderModule([
            {id: 1, name: 'bob'},
            {id: 2, name: 'miranda'},
            {id: 125, name: 'andy'}
        ], 'M').then(male_fb_members => {
            expect(male_fb_members.length).to.be.eql(2);
            expect(male_fb_members[1].id).to.be.eql(125);
        });
    });
});

describe('recursive async batch processing', function () {

    it('ends when a desired number of results is reached', () => {
        const batches = [[1, 2, 3], [4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14]];
        const resultSize = 4;
        return males_promise(batches, resultSize)
            .then(result => {
                expect(result.length).to.be.eql(resultSize);
                result.forEach(obj => {
                    expect(obj.gender).to.be.eql('M');
                });
            });
    });

    it('ends when batches are over', () => {
        const batches = [[1, 2, 3], [4, 5, 6, 7, 8], [9, 10, 11, 12, 13, 14]];
        const resultSize = 400;
        return males_promise(batches, resultSize)
            .then(result => {
                expect(result.length < resultSize).to.be.true;
            });
    });
});

function enumeration(n) {
    return Array.from(Array(n).keys());
}

