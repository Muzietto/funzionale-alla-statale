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

    it('when you want to make your operators a bit more readable', () => {
        const objs = [{id: 1}, {id: 5}, {id: 3}, {id: 6}, {id: 4}, {id: 2}, {id: 7}, {id: 5}, {id: 6}];

        const idGetter = obj => obj.id;
        const complicatedIdExtraction = objs.map(idGetter);

        expect(complicatedIdExtraction[0]).to.be.eql(1);
        expect(complicatedIdExtraction[1]).to.be.eql(5);

        const get = field => obj => obj[field];
        const simplerIdExtraction = objs.map(get('id'));

        expect(simplerIdExtraction).to.be.eql(complicatedIdExtraction);
    });
});

describe('separating single params', () => {
    it('allows to give e.g. the first param in advance', () => {
        const firstIsTwelve = callFirst(threeParams, 12);

        expect(firstIsTwelve(3, 4)).to.be.eql(/**/);

        function threeParams(a, b, c) {
            return a + b + c;
        }
    });
});

describe('generic unary currying is tricky to implement', () => {
    it('building stepwise an array with the args given so far', () => {

        expect(multiParam(1, 2, 3, 4)).to.be.eql(10);

        const curriedMultiParam = curried(multiParam);
        expect(curriedMultiParam(1)(2)(3)(4)).to.be.eql(/**/);
    });
    it('...and watch out that this implementation is not strictly unary', () => {

        const curriedMultiParam = curried(multiParam);
        expect(curriedMultiParam(1, 2)(3, 4)).to.be.eql(/**/);
    });
});

function multiParam(a, b, c, d) {
    return a + b + c + d;
}

function callFirst(fn, firstArg) {
    return function () {
        var args = Array.prototype.slice.call(arguments);

        return fn.apply(null, [firstArg].concat(args));
    };
}

function curried(fn) {
    var arity = fn.length;

    return fnAppliedToStepwiseArgs([]);

    function fnAppliedToStepwiseArgs(argsSoFar) {
        return function () {
            let currentArgs = Array.prototype.slice.call(arguments);

            var updatedArgsSoFar = argsSoFar.concat(currentArgs);

            if (updatedArgsSoFar.length >= arity) {
                return fn.apply(null, updatedArgsSoFar);
            }
            else return fnAppliedToStepwiseArgs(updatedArgsSoFar);
        };
    }
}
