 
// //////// TREE ////////////

// e.g. all children filtered
function all(predicate) {
}

// e.g. modify all children
function traverse(fab) {
}

// find && return cloned parent
function parent(tree, child, prevParent) {
  return tree.match(
    () => {},
    i => {
      if (prevParent && (i.name() === item(child).name())) {
        return prevParent;
      }
    },
    (i, cs) => {
      if (prevParent && (i.name() === item(child).name())) {
        return prevParent;
      }
      return cs.reduce((acc, curr) => {
        return acc || parent(curr, child, node(i, cs));
      }, null);
    }
  );
}

// recognize parent, push child into children - mutation!!!
function insert(tree, child, parent) {
  tree.match(
    () => {},
    i => {}, // TODO - handle case when parent is still a leaf
    (i, cs) => {
      if (i.name() === item(parent).name()) {
        cs.push(child);
        return;
      }
      cs.forEach(c => { // TODO - exit loop after insert
        insert(c, child, parent);
      });
    }
  );
}

// recognize parent, clone, push child into children - pure!!
function insertion(tree, child, parent) {
  return tree; // TODO - complete me!
}

// tree = empty || leaf || node
function empty() {
  const result = function() {};
  result.match = function(e, l, n) {
    return e();
  };
  return result;
}

function leaf(item) {
  const result = function(w) {
    return w(item);
  };
  result.match = function(e, l, n) {
    return l(item);
  };
  return result;
}

function node(item, children) {
  const result = function(w) {
    return w(item, children);
  };
  result.match = function(e, l, n) {
    return n(item, children);
  };
  return result;
}

function item(tree) {
  return tree.match(
    () => { return null; },
    i => { return i; },
    (i, cs) => { return i; }
  );
}

function children(tree) {
  return tree.match(
    () => { return null; },
    item => { return null; },
    (item, children) => { return children; }
  );
}

function child(tree) {
  return function(pos) {
    return children(tree)[pos];
  };
}

function subtree(tree, navigation) {
  return navigation(tree);
}

// count items
function count(tree) {
  return tree.match(
    () => { return 0; },
    item => { return 1; },
    (item, children) => {
      return children.reduce((acc, curr) => {
        return acc + count(curr);
      }, 1);
    }
  );
}

function depth(tree) {
  return tree.match(
    () => { return 0; },
    item => { return 1; },
    (item, children) => {
      return 1 + children.reduce((acc, curr) => {
        return Math.max(acc, depth(curr));
      }, 0);
    }
  );
}

// //////// MAYBE ////////////
function some(item) {
  if (item === null
   || item === NaN
   || item === Infinity
   || typeof item === 'undefined') {
    return none();
  }
  const result = function(w) {
    return w(item);
  };
  result.match = function(s, n) {
    return s(item);
  };
  return result;
}

function none() {
  const result = function(w) {
    return w();
  };
  result.match = function(s, n) {
    return n();
  };
  return result;
}

function maybe_fmap(maybe, fab) {
  return maybe.match(
    i => {
      try {
        return some(fab(i));
      } catch (e) {
        return none();
      }
    },
    () => { return maybe; }
  );
}

function isSome(maybe) {
  return maybe.match(
    () => { return true; },
    () => { return false; }
  );
}
function isNone(maybe) {
  return maybe.match(
    () => { return false; },
    () => { return true; }
  );
}

// //////// EITHER /////////////
function left(error) {
  const result = function(w) {
    return w(error);
  };
  result.match = function(l, r) {
    return l(error);
  };
  return result;
}

function right(value) {
  const result = function(w) {
    return w(value);
  };
  result.match = function(l, r) {
    return r(value);
  };
  return result;
}

function either_fmap(either, fab) {
  return either.match(
    () => { return either; },
    value => {
      try {
        return right(fab(value));
      } catch (error) {
        return left(error);
      }
    }
  );
}

function isLeft(either) {
  return either.match(
    () => { return true; },
    () => { return false; }
  );
}
function isRight(either) {
  return either.match(
    () => { return false; },
    () => { return true; }
  );
}

// mutable thing
function newItem(name) {
  return { name:function() { return name;}, filtered: false };
}
// TODO - create pseudo-mutable items using pure functions
