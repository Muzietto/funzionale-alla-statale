function Tuple() {
}

function Pair(a, b) {
    let result = new _pair(a, b);
    result[Symbol.iterator] = function*() {
        yield a;
        yield b;
    };
    return result;
}
Pair.prototype = Object.create(Tuple.prototype);

function _pair(a, b) {
    Object.defineProperty(this, 0, {value: a, writable: false});
    Object.defineProperty(this, 1, {value: b, writable: false});
}
_pair.prototype.isPair = true;
_pair.prototype.type = 'pair';
_pair.prototype.toString = function () {
    return '[' + this[0].toString() + ',' + this[1].toString() + ']';
};

function Triple(a, b, c) {
    let result = new _triple(a, b, c);
    result[Symbol.iterator] = function*() {
        yield a;
        yield b;
        yield c;
    };
    return result;
}
Triple.prototype = Object.create(Tuple.prototype);

function _triple(a, b, c) {
    Object.defineProperty(this, 0, {value: a, writable: false});
    Object.defineProperty(this, 1, {value: b, writable: false});
    Object.defineProperty(this, 2, {value: c, writable: false});
}
_triple.prototype.isTriple = true;
_triple.prototype.type = 'triple';
_triple.prototype.toString = function () {
    return '[' + this[0].toString() + ',' + this[1].toString() + ',' + this[2].toString() + ']';
};

Tuple.Pair = Pair;
Tuple.prototype.Pair = Pair;

Tuple.Triple = Triple;
Tuple.prototype.Triple = Triple;
