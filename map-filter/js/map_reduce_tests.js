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
    it('calculate the sum of all elements inside an array', () => {

        function sum(array) {
            return 0;
        }

        expect(sum([1, 2, 3])).to.be.eql(6);

        // try something like [1,2,3].reduce(.. , ..)
        expect([1, 2, 3]).to.be.eql(2);

    });

    it('calculate the average of all elements inside an array', () => {

        function average(array) {
            return 0;
        }

        expect(average([1, 2, 3])).to.be.eql(2);

        // try something like [1,2,3].reduce(.. , ..)
        expect([1, 2, 3]).to.be.eql(2);

    });

    it('verify that all elements of an array satisfy a given condition (same as Array.prototype.every)', () => {

        function isAllEven(array) {
            return true;
        }

        expect(isAllEven([2, 4, 6])).to.be.true;

        // try something like [2,4,6].reduce(.. , ..)
        expect([2, 4, 6]).to.be.true;

        // you can obtain this also with Array.prototype.every
        expect([2, 4, 6].every(/* ... */)).to.be.true;
    });

    it('verify that at least one element of an array satisfies a given condition (same as Array.prototype.some)', () => {

        function atLeastOneEven(array) {
            return true;
        }

        expect(atLeastOneEven([1, 4, 7])).to.be.true;

        // try something like [1,4,7].reduce(.. , ..)
        expect([1, 4, 7]).to.be.true;

        // you can obtain this also with Array.prototype.some
        expect([2, 4, 6].some(/* ... */)).to.be.true;
    });

    it('clone an object while modifying it partially', () => {

        function makeEvenValuesOneven(obj) {
            return obj;
        }

        expect(makeEvenValuesOneven({a: 2, b: 5})).to.be.eql({a: 3, b: 5});

        // try something like Object.keys(obj).reduce(.. , ..)
        expect({a: 2, b: 5}).to.be.eql({a: 3, b: 5});
    });

    describe('do something n times by defining an \'enumeration\' factory', () => {

        function enumeration(n) {
            return Array.from(Array(n).keys());
        }

        it('verifying that it works', () => {
            expect(enumeration(1)).to.be.eql([0]);
            expect(enumeration(5)).to.be.eql([0, 1, 2, 3, 4]);
        });

        it('and using it to command a reduction', () => {

            // you may find the following regex useful: /^(.*)\.[^\.]+$/
            // or you just may go down on splitting the string
            function chopNTimes(times, string) {
                return string;
            }

            expect(chopNTimes(3, 'ab.cde.f.gh.ijk.lm')).to.be.eql('ab.cde.f');

            // where do you put the 'ab.cde.f.gh.ijk.lm' string?
            expect(enumeration(/*times*/).reduce(/*.. , ..*/)).to.be.eql('a.b.c.d.e.f');
        });

        it('in a working proof of concept', () => {

            const THE_REGEX = /^(.*)\.[^\.]+$/;

            expect(enumeration(3)
                .reduce((acc, curr) => THE_REGEX.exec(acc)[1], 'ab.cde.f.gh.ijk.lm'))
                .to.be.eql('ab.cde.f');
        });
    });
});