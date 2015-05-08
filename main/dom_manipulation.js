
var riquadro = document.getElementById('mainDiv');

riquadro.innerHTML = '<a href="http://www.google.com" target="_blank">GOOGLE</a>';

riquadro.addEventListener('mouseenter',function(e){ this.style.background = 'yellow'; });

riquadro.addEventListener('mouseleave',function(e){ this.style.background = 'white'; });
