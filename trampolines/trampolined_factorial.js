
function fact(n){
  return (n === 0) ? 1 : n * fact(n - 1)
}

fact(100000) // Max call size exceeded

function fact2(n){

  function xxx(ind, result){
    if (ind === 0) {
      return result;
    } else {
      return function(){
        return xxx(ind - 1, ind * result);
      }
    }
  }
  var start = xxx(n, 1);
  while (typeof start === 'function'){
    // trampoline
    start = start();
  }
  return start;  
}

fact2(100000) // Infinity

Number.MAX_VALUE

fact2(170)
