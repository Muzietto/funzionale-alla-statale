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

    it('that can be safely mapped over to modify their values', function () {

        expect(Maybe.of([1, 2, 3]).fmap(x => x.concat(x)).getOrElse('huge mistake'))
            .to.be.eql([1, 2, 3, 1, 2, 3]);
        expect(Maybe.of([1, 2, 3]).fmap(x => 2 * x).getOrElse('huge mistake'))
            .to.be.eql('huge mistake');
    });

    describe('that can be combined in fail-safe operations - as applicative', function () {
        it('for example, a very silly adder function', function () {

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
        it('or a naive list builder', function () {

            var cons = x => xs => [x].concat(xs);

            var MaybeCons = Maybe.fromNullable(cons);

            var applicationOk = MaybeCons
                .apply(optionalParsedInt('123'))
                .apply(Maybe.Just([234, 345]));

            expect(applicationOk.getOrElse('no result')).to.be.eql([123, 234, 345]);

            var applicationKo = MaybeCons
                .apply(optionalParsedInt('abc'))
                .apply(Maybe.Just([234, 345]));

            expect(applicationKo.getOrElse('no result')).to.be.eql('no result');
        });
        describe('or a more serious list builder', function () {
            it('that skips Nothing\'s', function () {

                var cons = x => xs => [x].concat(xs);
                var reverseArray = arra => arra.reverse();

                var MaybeCons = Maybe.fromNullable(cons);

                expect(maybeList1([/**/]))
                    .to.be.eql(Maybe.Just([1, 2]));

                function maybeList1(listOfMaybes) {
                    return listOfMaybes.reduce((acc, currMaybe) => {
                        if (currMaybe.isJust) {
                            return MaybeCons
                                .apply(currMaybe)
                                .apply(acc);
                        } else {
                            return acc;
                        }
                    }, Maybe.Just([])).fmap(reverseArray);
                }
            });
            it('that invalidates the whole list once a Nothing is encountered', function () {

                var cons = x => xs => [x].concat(xs);
                var reverseArray = arra => arra.reverse();

                var MaybeCons = Maybe.fromNullable(cons);

                expect(maybeList2([Maybe.Just(1), Maybe.Nothing, Maybe.Just(2)]))
                    .to.be.eql(Maybe.Nothing());

                expect(maybeList2([Maybe.Just(1), Maybe.Just(2)]))
                    .to.be.eql(Maybe.Just([1, 2]));

                function maybeList2(listOfMaybes) {
                    return listOfMaybes.reduce((acc, currMaybe) => {
                        if (currMaybe.isJust && acc.isJust) {
                            return MaybeCons
                                .apply(currMaybe)
                                .apply(acc);
                        } else {
                            return Maybe.Nothing();
                        }
                    }, Maybe.Just([])).fmap(reverseArray);
                }
            });
        });
    });

    describe('that can be combined in fail-safe operations - as monad', function () {

        it('for example, a simple account balance calculator', () => {

            // as long as the account balance is positive or zero, its value is Just(balance)
            // if the account balance becomes negative, its value is Nothing
            var changeBalance = delta => balance => (balance + delta >= 0) ? Maybe.of(balance + delta) : Maybe.Nothing();

            expect(Maybe.of(2).bind(changeBalance(1)).bind(changeBalance(-3)).getOrElse('you are broke'))
                .to.be.eql(0);
            expect(Maybe.of(2).bind(changeBalance(1)).bind(changeBalance(-4)).getOrElse('you are broke'))
                .to.be.eql('you are broke');
        });

        it('with a flexible overdraft value', () => {

            var changeBalance = delta => balance => (balance + delta >= 0) ? Maybe.of(balance + delta) : Maybe.Nothing();
            // this function has one drawback: the maximum overdraft value (0) is hardcoded inside, and not modifiable
            // what we need is to pass around a Maybe.Just(Tuple.Pair(balance, overdraft))

            var changeBalance = delta => pair => pair; // TODO: implement me
            expect(Maybe.of(Tuple.Pair(2, -1)).bind(changeBalance(-1)).getOrElse('you exceeded your overdraft'))
                .to.be.eql(Tuple.Pair(1, -1));
            expect(Maybe.of(Tuple.Pair(2, -1)).bind(changeBalance(-3)).getOrElse('you exceeded your overdraft'))
                .to.be.eql(Tuple.Pair(-1, -1)); // still allowed
            expect(Maybe.of(Tuple.Pair(2, -1)).bind(changeBalance(-4)).getOrElse('you exceeded your overdraft'))
                .to.be.eql('you exceeded your overdraft'); // no longer allowed

            // let's implement a function that changes the value of the overdraft without touching the balance
            var newOverdraft = newValue => pair => pair; // TODO: implement me

            expect(Maybe.of(Tuple.Pair(2, -1)).bind(newOverdraft(-4)).bind(changeBalance(-4)).getOrElse('you exceeded your overdraft'))
                .to.be.eql(Tuple.Pair(-2, -4));

            // after solving the next exercise, you may want to implement debt recovering also here
        });

        it('but the possibility to recover from debt is tricky', () => {
            var changeBalance = delta => balance => (balance + delta >= 0) ? Maybe.of(balance + delta) : Maybe.Nothing();
            // once we are in red and the balance becomes a Nothing, every function that we bind will actually not operate

            // orElse to the rescue!
            expect(Maybe.of(2).bind(changeBalance(-3)).orElse(/* TODO: implement me */).getOrElse('you are broke'))
                .to.be.eql(0);

            expect(Maybe.of(2).bind(changeBalance(-3)).bind(changeBalance(-4)).orElse(/* TODO: implement me */).bind(changeBalance(5)).getOrElse('you are broke'))
                .to.be.eql(5);
            // question: what is the value of balance when orElse is applied in the last test?
        });
    });
})
;

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
