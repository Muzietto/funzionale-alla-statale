expect = chai.expect;

describe('curried functions are useful', function () {

    it('when you have some input available before others', () => {
        const first = 12;

        const curriedFun = aa => (bb, cc, dd) => multiParam(aa, bb, cc, dd);

        const partiallyApplied = curriedFun(first);

        expect(typeof partiallyApplied).to.be.eql('function');

        // now you can pass partiallyApplied as a first-class object
        expect((fun => fun(3, 4, 5))(partiallyApplied)).to.be.eql(/**/);
    });

    it('when you want to differentiate executions beforehand', () => {
        const curriedFun = (aa, bb) => (cc, dd) => multiParam(aa, bb, cc, dd);

        const hamAndCheeseRecipe = curriedFun('ham', 'cheese');
        const fishAndChipsRecipe = curriedFun('fish', 'chips');
        const chocolateAndCreamRecipe = curriedFun('chocolate', 'cream');

        const wineAndMustard = ['wine', 'mustard'];

        expect(hamAndCheeseRecipe.apply(null, wineAndMustard)).to.be.eql(/**/);
        expect(fishAndChipsRecipe.apply(null, wineAndMustard)).to.be.eql(/**/);

    });
});

describe('generic unary currying is easy to implement', () => {
    it('using reduceRight', () => {

        expect(multiParam(1, 2, 3, 4)).to.be.eql(10);

        const curriedMultiParam = curried(multiParam);

        expect(curriedMultiParam(1)(2)(3)(4)).to.be.eql(10);

        function curried(multiParamFun) {
            const numParams = multiParamFun.length;

            return enumeration(numParams)
                .reduceRight((acc, rest) => {

                    return x => acc(null, )
                }, multiParamFun.apply);
        }
    });
});

function multiParam(a, b, c, d) {
    return a + b + c + d;
}

function enumeration(n) {
    return Array.from(Array(n).keys());
}

