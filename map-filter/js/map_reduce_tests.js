expect = chai.expect;

describe('using map and/or filter', function () {
    beforeEach(function () {
    });

    it('transform a list of strings into a list of their lengths', function () {

        function stringToItsLength(array) {
            return array;
        }

        expect(stringToItsLength([''])).to.be.eql([0]);

        // try to use ['a'].map(........)
        expect(['a']).to.be.eql([1]);

        expect(['social', 'sweethearts']).to.be.eql([6, 11]);
    });

    it('filter a list of numbers to remove all even ones', function () {

        function withoutEvens(array) {
            return array;
        }

        expect(withoutEvens([1, 2, 3])).to.be.eql([1, 3]);

        // try to use [1,2,3].filter(........)
        expect([1, 2, 3]).to.be.eql([1, 3]);
    });

    it('and split, create a list of ASCII codes of all chars in a string', function () {

        function charCodesArray(string) {
            // you can use String.prototype.charCodeAt
            return string;
        }

        expect(charCodesArray('abc')).to.be.eql([97, 98, 99]);

        // try to solve it with a one-liner
        expect('abc').to.be.eql([97, 98, 99]);

        // try to solve it with a one-liner
        expect(['abc', 'def']).to.be.eql([[97, 98, 99], [100, 101, 102]]);

        // one of the next steps will be to flatten the two sub-arrays
    });

    it('capitalize all strings inside an array', function () {

        function capitalized(array) {
            return array;
        }

        expect(capitalized(['social', 'sweethearts', 'gmbh'])).to.be.eql(['Social', 'Sweethearts', 'Gmbh']);

        // try to make it with a one-liner and without using substring
        // nor any other string positional operator
        // hint: check the API docs for String.prototype.map
        expect(['social', 'sweethearts', 'gmbh']).to.be.eql(['Social', 'Sweethearts', 'Gmbh']);
    });
});

describe('using reduce', () => {
    it('');
});