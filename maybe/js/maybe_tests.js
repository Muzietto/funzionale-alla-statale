expect = chai.expect;

describe('maybes are optional values', () => {
    it('that express whether a calculation has produced some result - 1', () => {

        expect(Maybe.fromNullable(parsedIntOrNull('123')).isJust).to.be.true;
        expect(Maybe.fromNullable(parsedIntOrNull('abc')).isNothing).to.be.true;
    });

    it('that express whether a calculation has produced some result - 2', () => {

        expect(Maybe.fromNullable([1, 2, 3].findIndex(x => (x === 1))).isJust)
            .to.be.true;
        expect(Maybe.fromNullable([1, 2, 3].findIndex(x => (x === 2))).get())
            .to.be.eql(/* TO DO */);
        expect(Maybe.fromNullable([1, 2, 3].findIndex(x => (x === 4))).isNothing)
            .to.be/* TO DO */;
    });

    it('that can be safely mapped over to modify their values', () => {

<<<<<<< Updated upstream
        expect(Maybe.of([1, 2, 3]).fmap(x => x.concat(x)).getOrElse('huge mistake'))
            .to.be.eql(/* TO DO */);
        expect(Maybe.of([1, 2, 3]).fmap(x => 2 * x).getOrElse('huge mistake'))
            .to.be.eql(/* TO DO */);
=======
        expect(Maybe.of([1, 2, 3]).fmap(ar => ar.concat(ar)).getOrElse('huge mistake'))
            .to.be.eql([1, 2, 3, 1, 2, 3]);
        expect(Maybe.of([1, 2, 3]).fmap(ar => Maybe.of(2 * ar)).getOrElse('huge mistake'))
            .to.be.eql('huge mistake');
>>>>>>> Stashed changes
    });

    describe('that can be combined in fail-safe operations - as applicative', () => {
        it('for example, a very silly adder function', () => {

            var add = x => y => x + y;

            var maybeAdd = Maybe.of(add);

            var applicationOk = maybeAdd
                .apply(optionalParsedInt('123'))
                .apply(optionalParsedInt('234'));

            expect(applicationOk.getOrElse('no result')).to.be.eql(/* TO DO */);

            var applicationKo = maybeAdd
                .apply(optionalParsedInt('abc'))
                .apply(optionalParsedInt('234'));

            expect(applicationKo.getOrElse('no result')).to.be.eql(/* TO DO */);
        });
        it('or a naive list builder', () => {

            var cons = x => xs => [x].concat(xs);

            var maybeCons = Maybe.of(cons);

            var applicationOk = maybeCons
                .apply(optionalParsedInt('123'))
                .apply(Maybe.Just([234, 345]));

            expect(applicationOk.getOrElse('no result')).to.be.eql(/* TO DO */);

            var applicationKo = maybeCons
                .apply(optionalParsedInt('abc'))
                .apply(Maybe.Just([234, 345]));

            expect(applicationKo.getOrElse('no result')).to.be.eql(/* TO DO */);
        });
        describe('or a more serious list builder', () => {
            it('that skips Nothing\'s', () => {

                var cons = x => xs => [x].concat(xs);
                var reverseArray = arra => arra.reverse();

                var maybeCons = Maybe.of(cons);

                expect(maybeList1([/**/]))
                    .to.be.eql(Maybe.Just([1, 2]));

                function maybeList1(listOfMaybes) {
                    return listOfMaybes
                      .reduce(/* implement me */, Maybe.Just([]))
                      .fmap(/* why would you need me? */);
                }
            });
            it('that invalidates the whole list once a Nothing is encountered', () => {

                var cons = x => xs => [x].concat(xs);
                var reverseArray = arra => arra.reverse();

                var maybeCons = Maybe.of(cons);

                expect(maybeList2([Maybe.Just(1), Maybe.Nothing(), Maybe.Just(2)]))
                    .to.be.eql(Maybe.Nothing());

                expect(maybeList2([Maybe.Just(1), Maybe.Just(2)]))
                    .to.be.eql(Maybe.Just([1, 2]));

                function maybeList2(listOfMaybes) {/* implement me */}
            });
        });
    });

    describe('that can be combined in fail-safe operations - as monad', () => {

        it('for example, a simple account balance calculator', () => {

            // as long as the account balance is positive or zero, its value is Just(balance)
            // if the account balance becomes negative, its value is Nothing
            var changeBalance = delta => balance => (balance + delta >= 0)
              ? Maybe.of(balance + delta)
              : Maybe.Nothing();

            expect(Maybe.of(2).bind(changeBalance(1)).bind(changeBalance(-3)).getOrElse('you are broke'))
                .to.be.eql(0);
            expect(Maybe.of(2).bind(changeBalance(1)).bind(changeBalance(-4)).getOrElse('you are broke'))
                .to.be.eql('you are broke');
        });

        it('with a flexible overdraft value', () => {

            var changeBalance = delta => balance => (balance + delta >= 0)
              ? Maybe.of(balance + delta)
              : Maybe.Nothing();
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
            var newOverdraft = newValue => ([saldo, overdraft]) => Maybe.of(Tuple.Pair(saldo, newValue));

            expect(Maybe.of(Tuple.Pair(2, -1)).bind(newOverdraft(-4)).bind(changeBalance(-4)).getOrElse('you exceeded your overdraft'))
                .to.be.eql(Tuple.Pair(-2, -4));

            // after solving the next exercise, you may want to implement debt recovering also here
        });

        it('but the possibility to recover from debt is tricky', () => {
<<<<<<< Updated upstream
=======
            var changeBalance = delta => balance => (balance + delta >= 0) ? Maybe.of(balance + delta) : Maybe.Nothing();
            // once we are in red and the balance becomes a Nothing, every function that we bind will actually not operate

            // orElse to the rescue!
            expect(Maybe.of(2).bind(changeBalance(-3)).orElse(_ => Maybe.of(0)).getOrElse('you are broke'))
                .to.be.eql(0);
>>>>>>> Stashed changes

            var changeBalance = delta => balance => (balance + delta >= 0)
              ? Maybe.of(balance + delta)
              : Maybe.Nothing();
            // once we are in red and the balance becomes a Nothing,
            // every function that we bind will actually not operate

            // use orElse to rescue the situation!
            expect(Maybe.of(2)
              .bind(changeBalance(-3))
              .orElse(/* TODO: implement me */)
              .getOrElse('you are broke')).to.be.eql(0);

            expect(Maybe.of(2)
              .bind(changeBalance(-3))
              .bind(changeBalance(-4))
              .orElse(/* TODO: implement me */)
              .bind(changeBalance(5))
              .getOrElse('you are broke')).to.be.eql(5);
            // question: what is the value of balance when orElse is applied in the last test?
        });
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
