expect = chai.expect;

describe('using map and/or filter', function () {
    beforeEach(function () {
    });

    describe('transform a list of strings into a list of their lengths', function () {

        it('first doing it with a procedural routine', () => {

            function stringToItsLength(array) {
                return array;
            }

            expect(stringToItsLength([''])).to.be.eql([0]);
        });
        it('then doing it functionally', () => {

            // try to use ['a'].map(........)
            expect(['a']).to.be.eql([1]);

            expect(['easy', 'welfare']).to.be.eql([4, 7]);
        });
    });

    describe('filter a list of numbers to remove all even ones', function () {

        it('first doing it with a procedural routine', () => {
            function withoutEvens(array) {
                return array;
            }

            expect(withoutEvens([1, 2, 3])).to.be.eql([1, 3]);
        });
        it('then doing it functionally', () => {

            // try to use [1,2,3].filter(........)
            expect([1, 2, 3]).to.be.eql([1, 3]);
        });
    });

    describe('and split, create a list of ASCII codes of all chars in a string', function () {

        it('first doing it with a procedural routine', () => {

            function charCodesArray(string) {
                // NB: 'abc'.charCodeAt(0) = 97; 'abc'.charCodeAt(1) = 98; 'abc'.charCodeAt(c) = 99;
                return string;
            }

            expect(charCodesArray('abc')).to.be.eql([97, 98, 99]);
        });

        it('then doing it functionally', () => {

            // try to solve it with a one-liner
            expect('abc').to.be.eql([97, 98, 99]);

            // try to solve it with a one-liner
            expect(['abc', 'def']).to.be.eql([[97, 98, 99], [100, 101, 102]]);

            // one of the next steps will be to flatten the two sub-arrays
        });
    });

    describe('capitalize all strings inside an array', function () {

        it('first doing it with a procedural routine', () => {
            function capitalized(array) {
                return array;
            }

            expect(capitalized(['easy', 'welfare', 'milano'])).to.be.eql(['Easy', 'Welfare', 'Milano']);
        });

        it('then doing it functionally', () => {

            // implement the function capitalized without using substring
            // nor any other string positional operator
            // you will need to split the string at the beginning and join it back at the end
            // hint: check the complete signature of the mapping function
            // inside the API docs for Array.prototype.map
            expect(['easy', 'welfare', 'milano']).to.be.eql(['Easy', 'Welfare', 'Milano']);

            function capitalized(string) {
              return string;
            }
        });
    });
});

describe('using reduce', () => {
    describe('calculate the sum of all elements inside an array', () => {

        it('first doing it with a procedural routine', () => {
            function sum(array) {
                return 0;
            }

            expect(sum([1, 2, 3])).to.be.eql(6);

        });

        it('then doing it functionally', () => {
            // try something like [1,2,3].reduce((sum, number) => ... , ..)
            expect([1, 2, 3]).to.be.eql(6);
        });

    });

    describe('calculate the average of all elements inside an array', () => {

        it('first doing it with a procedural routine', () => {
            function average(array) {
                return 0;
            }

            expect(average([1, 2, 3])).to.be.eql(2);
        });

        it('then doing it functionally', () => {

          // try something like [1,2,3].reduce((average, number) => ... , ..)
            expect([1, 2, 3]).to.be.eql(2);
        });

    });

    describe('verify that all elements of an array satisfy a given condition (same as Array.prototype.every)', () => {

        it('first doing it with a procedural routine', () => {
            function isAllEven(array) {
                return true;
            }

            expect(isAllEven([2, 4, 6])).to.be.true;

        });

        it('then doing it functionally', () => {
            // try something like [2,4,6].reduce(.. , ..)
            expect([2, 4, 6]).to.be.true;

            // you can obtain this also with Array.prototype.every
            expect([2, 4, 6].every(/* ... */)).to.be.true;
        });
    });

    describe('verify that at least one element of an array satisfies a given condition (same as Array.prototype.some)', () => {

        it('first doing it with a procedural routine', () => {
            function atLeastOneEven(array) {
                return false;
            }

            expect(atLeastOneEven([1, 4, 7])).to.be.true;

        });

        it('then doing it functionally', () => {
            // try something like [1,4,7].reduce(.. , ..)
            expect([1, 4, 7]).to.be.true;

            // you can obtain this also with Array.prototype.some
            expect([2, 4, 6].some(/* ... */)).to.be.true;
        });
    });

    describe('clone an object while modifying it partially', () => {

        it('first doing it with a procedural routine', () => {

            // hint: Object.keys({ a: 123, b: false }) = ['a', 'b']
            function makeEvenValuesOneven(obj) {
                return obj;
            }

            expect(makeEvenValuesOneven({a: 2, b: 5})).to.be.eql({a: 3, b: 5});
        });

        it('then doing it functionally', () => {

            // try something like Object.keys(obj).reduce(.. , ..)
            expect({a: 2, b: 5}).to.be.eql({a: 3, b: 5});
        });
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
    });
    describe('SPECIAL CHALLENGE: flatten an array, no matter how many levels it\'s nested', function () {

        it('first doing it with a procedural routine', () => {
            function flattened(array) {
                return array;
            }

            expect(flattened([1, [2, 3, [4]], 5, [[6, 7, [8]], 9], 0]))
                .to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        });

        it('then doing it functionally', () => {

            function flatteningReducer(acc, curr) {
                return acc;
            }

            expect([1, [2, 3, [4]], 5, [[6, 7, [8]], 9], 0])
                .to.be.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        });
    });
});
