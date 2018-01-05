expect = chai.expect;

describe('maybes are optional values', function () {
    it('that express whether a calculation has produced some result - 1', function () {

        expect(Maybe.fromNullable(parsedIntOrNull('123')).isJust).to.be.true;
        expect(Maybe.fromNullable(parsedIntOrNull('abc')).isNothing).to.be.true;
    });

    it('that express whether a calculation has produced some result - 2', function () {

        expect(Maybe.fromNullable([1, 2, 3].find(x => (x === 2))).get())
            .to.be.eql(2);
        expect(Maybe.fromNullable([1, 2, 3].find(x => (x === 4))).isNothing)
            .to.be.true;
    });

    it('that can be combined in fail-safe operations', function () {

        var add = x => y => x + y;

        var MaybeAdd = Maybe.fromNullable(add);

        var applicationOk = MaybeAdd
            .apply(optionalParsedInt('123'))
            .apply(optionalParsedInt('234'));

        expect(applicationOk.getOrElse('no result')).to.be.eql(357);

        var applicationKo = MaybeAdd
            .apply(optionalParsedInt('abc'))
            .apply(optionalParsedInt('234'));

        expect(applicationKo.getOrElse('no result')).to.be.eql('no result');
    });
});

function parsedIntOrNull(str) {
    result = null;
    try {
        result = parseInt(str, 10);
    } catch (e) {

    }
    if (isNaN(result)) result = null;
    return result;
}

function optionalParsedInt(str) {
    return Maybe.fromNullable(parsedIntOrNull(str));
}