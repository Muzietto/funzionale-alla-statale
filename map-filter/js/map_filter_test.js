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

    it('filters a list of numbers to remove all even ones', function () {

        function withoutEvens(array) {
            return array;
        }

        expect(withoutEvens([1, 2, 3])).to.be.eql([1, 3]);

        // try to use [1,2,3].filter(........)
        expect([1, 2, 3]).to.be.eql([1, 3]);
    });


    it('and split, create a list of ASCII codes of all chars in a string', function () {

        function withoutEvens(array) {
            // you can use String.prototype.charCodeAt
            return array;
        }

        expect(charcodes('abc')).to.be.eql([97, 98, 99]);

        // try to solve it with an one-liner
        expect('abc').to.be.eql([97, 98, 99]);
    });

});
