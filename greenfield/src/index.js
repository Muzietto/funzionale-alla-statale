expect = chai.expect;

describe('test suite', () => {
  it('single test', () => {
    expect(true).to.be.true;
    expect(Maybe.of(123).isJust).to.be.true;
  });
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

  it('that can be safely mapped over to modify their values', function () {

      expect(Maybe.of([1, 2, 3]).fmap(x => x.concat(x)).getOrElse('huge mistake'))
          .to.be.eql([1, 2, 3, 1, 2, 3]);
      expect(Maybe.of([1, 2, 3]).fmap(x => 2 * x).getOrElse('huge mistake'))
          .to.be.eql('huge mistake');
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
