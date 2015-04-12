'use strict';

function writer(couple){
  var monad = couple.slice();
  var m_empty = '';
  var m_append = function(x,y){ return x+y; };
  monad.bind = function(faw){
    var newCouple = faw(monad[0]);
    return writer([newCouple[0], m_append(monad[1], newCouple[1])]);
  }
  return monad;
}
writer.unit = function(value){ return writer([value, '']); }

function validate() {
  var htmlElems = document.getElementsByClassName('validation');
  var inputsArray = [].slice.call(htmlElems);
  var monad = writer.unit();

  inputsArray.forEach(function(item){
    var predicate = new Function('value', 'return ' + item.dataset.predicate);
    var isOk = predicate(item.value);
    var verdict = item.id + '; ' + item.value + ' --> ' + isOk + '\n';
    var faw = function(previousIsOk){ return writer([isOk, verdict]);}
    monad = monad.bind(faw);
  });

  alert(monad[1]);
}
