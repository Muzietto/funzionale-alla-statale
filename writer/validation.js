'use strict';

function getById(id){ return document.getElementById(id); }
function getByClass(name){ return document.getElementsByClassName(name); }

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

function validate() {
  //debugger;
  var htmlElems = document.getElementsByClassName('validation');
  var inputsArray = [].slice.call(htmlElems);
  inputsArray.forEach(function(item){
    var predicate = Function('value', 'return ' + item.dataset.predicate);
    console.log(item.id + '; ' + item.value + ' --> ' + predicate(item.value));
  });
  
}
