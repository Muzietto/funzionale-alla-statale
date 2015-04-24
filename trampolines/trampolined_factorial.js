
function fact(n){
  return (n === 0) ? 1 : n * fact(n - 1)
}

fact(100000) // Max call size exceeded

function fact2(n){
  var result, helper;
  
  function helper(ind, acc){
    if (ind === 0) {
      return acc;
    } else {
      return function(){
        return helper(ind - 1, ind * acc);
      }
    }
  }
  var result = helper(n, 1);
  while (typeof start === 'function'){
    // trampoline
    result = result();
  }
  return result;  
}

fact2(100000) // Infinity

Number.MAX_VALUE

fact2(170)
