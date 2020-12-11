
describe('an algebraic data structure', () => {
  beforeEach(() => {
  });

  describe('when is a left e|right a either', () => {
    beforeEach(function() {
      this.eitherR = right(newItem(1));
      this.eitherL = left(new Error('ouch!'));
      this.returningFun = function(a) { return a + a; };
      this.throwingFun = function(a) { throw a + a; };
    });
    it('satisfies some minimal conditions', function() {
      expect(isRight(this.eitherR)).to.be.true;
      expect(isLeft(this.eitherR)).to.be.false;
      expect(isRight(this.eitherL)).to.be.false;
      expect(isLeft(this.eitherL)).to.be.true;
    });
    it('may be matched to get fmapped once', function() {
      this.fmappedRR = either_fmap(this.eitherR, this.returningFun);
      expect(isRight(this.fmappedRR)).to.be.true;
      this.fmappedRL = either_fmap(this.eitherR, this.throwingFun);
      expect(isLeft(this.fmappedRL)).to.be.true;
      this.fmappedLR = either_fmap(this.eitherL, this.returningFun);
      expect(isLeft(this.fmappedLR)).to.be.true;
      this.fmappedLL = either_fmap(this.eitherL, this.throwingFun);
      expect(isLeft(this.fmappedLL)).to.be.true;
    });
    it('may be matched to get fmapped twice', function() {
      this.fmappedRRR = either_fmap(this.fmappedRR, this.returningFun);
      expect(isRight(this.fmappedRR)).to.be.true;
      this.fmappedRRL = either_fmap(this.fmappedRR, this.throwingFun);
      expect(isRight(this.fmappedRR)).to.be.true;
      this.fmappedRLR = either_fmap(this.fmappedRL, this.returningFun);
      expect(isLeft(this.fmappedRL)).to.be.true;
      this.fmappedRLL = either_fmap(this.fmappedRL, this.throwingFun);
      expect(isLeft(this.fmappedRL)).to.be.true;
      this.fmappedLRR = either_fmap(this.fmappedLR, this.returningFun);
      expect(isLeft(this.fmappedLR)).to.be.true;
      this.fmappedLRL = either_fmap(this.fmappedLR, this.throwingFun);
      expect(isLeft(this.fmappedLR)).to.be.true;
      this.fmappedLLR = either_fmap(this.fmappedLL, this.returningFun);
      expect(isLeft(this.fmappedLL)).to.be.true;
      this.fmappedLLL = either_fmap(this.fmappedLL, this.throwingFun);
      expect(isLeft(this.fmappedLL)).to.be.true;
    });
  });

  describe('when is a some|none maybe', () => {
    beforeEach(function() {
      this.maybeA = some(newItem(1));
      this.maybeB = some(null);
    });
    it('satisfies some minimal conditions', function() {
      expect(isSome(this.maybeA)).to.be.true;
      expect(isNone(this.maybeA)).to.be.false;
      expect(isSome(this.maybeB)).to.be.false;
      expect(isNone(this.maybeB)).to.be.true;
    });
    it('may be matched to get fmapped once', function() {
      this.fmappedAA = maybe_fmap(this.maybeA, a => { return a + a; });
      expect(isSome(this.fmappedAA)).to.be.true;
      this.fmappedAB = maybe_fmap(this.maybeA, a => { throw a + a; });
      expect(isSome(this.fmappedAB)).to.be.false;
      this.fmappedBA = maybe_fmap(this.maybeB, a => { return a + a; });
      expect(isSome(this.fmappedBA)).to.be.false;
      this.fmappedBB = maybe_fmap(this.maybeB, a => { throw a + a; });
      expect(isSome(this.fmappedBB)).to.be.false;
    });
    it('may be matched to get fmapped twice', function() {
      this.fmappedAAA = maybe_fmap(this.fmappedAA, a => { return a + a; });
      expect(isSome(this.fmappedAAA)).to.be.true;
      this.fmappedAAB = maybe_fmap(this.fmappedAA, a => { throw a + a; });
      expect(isSome(this.fmappedAAB)).to.be.false;
      this.fmappedABA = maybe_fmap(this.fmappedAB, a => { return a + a; });
      expect(isSome(this.fmappedAB)).to.be.false;
      this.fmappedBAB = maybe_fmap(this.fmappedBA, a => { throw a + a; });
      expect(isSome(this.fmappedBAB)).to.be.false;
      this.fmappedBAA = maybe_fmap(this.fmappedBA, a => { return a + a; });
      expect(isSome(this.fmappedBAA)).to.be.false;
      this.fmappedBBA = maybe_fmap(this.fmappedBB, a => { return a + a; });
      expect(isSome(this.fmappedBBA)).to.be.false;
      this.fmappedBBB = maybe_fmap(this.fmappedBB, a => { throw a + a; });
      expect(isSome(this.fmappedBBB)).to.be.false;
    });
  });

  describe('when is an empty|leaf|node tree', () => {
    beforeEach(() => {
    });
    it('may be traversed to count its items', () => {
      expect(count(empty())).to.be.equal(0);
      expect(count(leaf(123))).to.be.equal(1);
      expect(count(node('asd', [leaf(123)]))).to.be.equal(2);
      expect(count(tree1)).to.be.equal(12);
    });

    it('may be traversed to measure its depth', () => {
      expect(depth(empty())).to.be.equal(0);
      expect(depth(leaf(123))).to.be.equal(1);
      expect(depth(node('asd', [leaf(123)]))).to.be.equal(2);
      expect(depth(tree1)).to.be.equal(6);
    });

    it('may be traversed to fetch a specific node and/or leaf', () => {
      const leaf22 = leaf(sms);
      const subtree11 = node(route3, [
        leaf(sdk),
        leaf22,
      ]);

      expect(children(subtree11).length).to.be.equal(2);
      expect(child(subtree11)(1)).to.be.equal(leaf22);
      expect(item(child(subtree11)(1)).name()).to.be.equal('sms');

      function child2nd(tree) {
        return child(tree)(1);
      }
      expect(subtree(subtree1, child2nd)).to.be.equal(leaf2);
    });

    it('may be traversed to add a child to a specific parent node (MUTATION!!)', () => {
      const parent = child(child(tree1)(1))(0);
      expect(item(parent).name()).to.be.equal('conn1');
      expect(children(parent).length).to.be.equal(2);
      expect(count(tree1)).to.be.equal(12);

      // mutates tree1 && children(parent)
      insert(tree1, leaf(cp_telfort), parent);

      expect(count(tree1)).to.be.equal(13);
      expect(depth(tree1)).to.be.equal(6);
      expect(children(parent).length).to.be.equal(3);
    });

    it.skip('may be traversed to add a child to a specific CLONED parent node (PURE!!)', () => {
      const parent = child(child(tree1)(1))(0);
      expect(item(parent).name()).to.be.equal('conn1');
      expect(children(parent).length).to.be.equal(3);

      const tree2 = insertion(tree1, leaf(cp_kpn), parent);
      const clonedParent = child(child(tree2)(1))(0);

      expect(count(tree2)).to.be.equal(14);
      expect(depth(tree2)).to.be.equal(6);
      expect(children(parent).length).to.be.equal(3);
      expect(children(clonedParent).length).to.be.equal(4);
    });

    it('may be traversed to find the parent of a given child - EASY', () => {
      const leaf22 = leaf(sms);
      const subtree11 = node(route3, [
        leaf(sdk),
        leaf22,
      ]);

      const foundParent = parent(subtree11, leaf22);
      expect(item(foundParent).name()).to.be.equal('route3');
    });
    it('may be traversed to find the parent of a given child - HARD', () => {
      const node_conn1 = child(child(tree1)(1))(0);
      const child1 = child(child(child(tree1)(1))(0))(2);

      const foundParent = parent(tree1, child1);
      expect(item(foundParent).name()).to.be.equal(item(node_conn1).name());
    });
  });

});
