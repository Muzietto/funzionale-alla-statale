
function count(n){
  return (n === 0) ? 0 : 1 + count(n - 1)
}

count(31440) // Max call size exceeded

function tr_count(n){
  var result, helper;
  
  function helper(x, acc){
    if (x === 0) return acc;
    return function(){
      return helper(x-1, acc+1);
    }
  }
  
  result = helper(n, 0);
  
  while (typeof result === 'function'){
    result = result();
  }
  return result;
}

tr_count(1234567890) // 45 secondi
