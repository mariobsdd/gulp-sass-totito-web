/*

state = 0: red
state = 1: yellow
state = 2: green

*/

// Modelo / estado
var player = 1;
var r1 = document.getElementById("r1");
var r2 = document.getElementById("r2");
var r3 = document.getElementById("r3");
var c1 = document.getElementById("col1");
var c2 = document.getElementById("col2");
var c3 = document.getElementById("col3");

var board = document.getElementById("board");

document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        text = target.textContent;   
}, false);

function putSymbol (casilla){
  if (player == 1){
    //agregar html para que muestre en la pantalla
  }
  else if (player == 2){

  }
  else{}
}

/*
var viewport = document.getElementById("viewport");
var changeTrigger = document.getElementById("change");

changeTrigger.addEventListener("click", function(){
  if(state === 0){
    state = 2;
  }
  else if(state === 1){
    state = 0;
  }
  else{
    state = 1;
  }

  viewport.innerHTML = render(state);
});


function render(state){
  var html = "";

  html += '<div class="traffic-light">';

  if(state === 0){
    html += '<div class="red light"></div>';
  }
  else{
    html += '<div class="red light off"></div>';
  }

  if(state === 1){
    html += '<div class="yellow light"></div>';
  }
  else{
    html += '<div class="yellow light off"></div>';
  }

  if(state === 2){
    html += '<div class="green light"></div>';
  }
  else{
    html += '<div class="green light off"></div>';
  }

  html += '</div>';

  return html;
}

viewport.innerHTML = render(state);*/
