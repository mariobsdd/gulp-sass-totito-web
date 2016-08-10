var state = {
  player: 1,
  matrix:   [[0,0,0],
            [0,0,0],
            [0,0,0]],
  winner: 0,
};

var viewport = document.getElementById('viewport');
function render(state){
  var html = '';
  var player = state.player;
  var matrix = state.matrix;
  var winner = state.winner;
  html += '<div id="board" class="board">';
  for (var i =0; i<matrix.length; i++) {
    var row = matrix[i];
    html += '<div id="r'+(i+1)+'" class="row'+(i+1)+'">';
    for (var j=0; j<matrix.length; j++) {
      var value = row[j];
      //console.log(value);
      if (value === 1){
        //dibujo X
        html += '<div id="col'+(i*3+j)+'" class="column'+(j+1)+' symbol">X';
      }
      else if (value === 2){
        //dibujo O
        html += '<div id="col'+(i*3+j)+'" class="column'+(j+1)+' symbol">O';
      }
      else if (value === 0){
        html += '<div id="col'+(i*3+j)+'" class="column'+(j+1)+'">';
      }
      html += '</div>'; //cierro columnas
    }
    html += '</div>' //cierro rows
  }
  html += '</div>'; //cierro board

  if (winner === 1){
    html += '<h2 id="final"> GANO JUGADOR 1 (X)</h2>';
  } else if (winner === 2){
    html += '<h2 id="final"> GANO JUGADOR 2 (O)</h2>';
  } else if (winner === 3){
    html += '<h2 id="final"> EL RESULTADO ES EMPATE</h2>'
  }
  html += '<button id="reset" class="btn">¡Volver a Empezar!</button>'
  return html;
}
function getWinner(casillas,gameOver){
  var winner = 0;
  //reviso casillas horizontales
  if (!gameOver) {
    gameOver = (casillas[0]===casillas[1])&&(casillas[1]===casillas[2])&&(casillas[2]>0); 
    winner = casillas[2];
  }
  if (!gameOver) {
    gameOver = (casillas[3]===casillas[4])&&(casillas[4]===casillas[5])&&(casillas[5]>0); 
    winner = casillas[5];}
  if (!gameOver) {
    gameOver = (casillas[6]===casillas[7])&&(casillas[7]===casillas[8])&&(casillas[8]>0); 
    winner = casillas[8];
  }
  //reviso casillas verticales
  if (!gameOver) {
    gameOver = (casillas[0]===casillas[3])&&(casillas[3]===casillas[6])&&(casillas[6]>0); 
    winner = casillas[6];
  }
  if (!gameOver) {
    gameOver = (casillas[1]===casillas[4])&&(casillas[4]===casillas[7])&&(casillas[7]>0); 
    winner = casillas[7];
  }
  if (!gameOver) {gameOver = (casillas[2]===casillas[5])&&(casillas[5]===casillas[8])&&(casillas[8]>0); 
    winner = casillas[8];
  }
  
  //reviso la diagonal
  if (!gameOver) {
    gameOver = (casillas[0]===casillas[4])&&(casillas[4]===casillas[8])&&(casillas[8]>0); 
    winner = casillas[8];
  }
  if (!gameOver) {
    gameOver = (casillas[6]===casillas[4])&&(casillas[4]===casillas[2])&&(casillas[2]>0); 
    winner = casillas[2];
  }
  console.log("ganador: "+winner);
  var out = {winner:winner,gameOver:gameOver};
  return out;
}

function addListeners() {
  var col0 = document.getElementById("col0");
  col0.addEventListener("click", function() {state = play(state, 0)});

  var col1 = document.getElementById("col1");
  col1.addEventListener("click", function() {state = play(state, 1)});
  
  var col2 = document.getElementById("col2");
  col2.addEventListener("click", function() {state = play(state, 2)});

  var col3 = document.getElementById("col3");
  col3.addEventListener("click", function() {state = play(state, 3)});
  
  var col4 = document.getElementById("col4");
  col4.addEventListener("click", function() {state = play(state, 4)});
  
  var col5 = document.getElementById("col5");
  col5.addEventListener("click", function() {state = play(state, 5)});
  
  var col6 = document.getElementById("col6");
  col6.addEventListener("click", function() {state = play(state, 6)});
  
  var col7 = document.getElementById("col7");
  col7.addEventListener("click", function() {state = play(state, 7)});
  
  var col8 = document.getElementById("col8");
  col8.addEventListener("click", function() {state = play(state, 8)});

  if(state.winner > 0) {
    var reset = document.getElementById("reset");
    reset.style.display = "block";
    reset.onclick = reset_page;
  }
}

function reset_page(){
  location.reload();
}

function play(state, id){
  //console.log(state);
  var turn = state.player; 
  var [cas1,cas2,cas3] = state.matrix[0];
  var [cas4,cas5,cas6] = state.matrix[1];
  var [cas7,cas8,cas9] = state.matrix[2];
  var board = [cas1,cas2,cas3,cas4,cas5,cas6,cas7,cas8,cas9]
  var selected = board[id];

  if (selected === 0) {
    selected = turn;
  }
  if (turn === 1) {
    turn = 2; 
  } else if (turn === 2){
    turn = 1;
  }
    board[id] = selected; 
    state.player = turn;
    var gameOver = false;
    var out = getWinner(board,gameOver);
    var winner = out.winner;
    gameOver = out.gameOver;
    console.log(winner,gameOver);
    //seteo los valores actuales a la matrix del estado
    state.matrix[0] = [board[0],board[1],board[2]];
    state.matrix[1] = [board[3],board[4],board[5]];
    state.matrix[2] = [board[6],board[7],board[8]];
    if (gameOver) {
      console.log("gano");
      state.winner = winner;
      for(i = 0; i < state.matrix.length ; i++){
        var row = state.matrix[i];
        for (j = 0; j < row.length; j++){
          var x = row[j];
          if (x === 0){
            row[j] = 0;
          }
        } 
      } 
    } 
    else {
      var itsOver = false; 
      for (i = 0; i < board.length; i++){
        itsOver = itsOver || (board[i] === 0); 
      }
      if (!itsOver) {
        state.winner = 3; //empate
      }
    }
  viewport.innerHTML = render(state);
  if (state.winner != 1 || state.winner!=2){
    addListeners();
  }
  return state
}
viewport.innerHTML = render(state);
if (state.winner != 1 || state.winner!=2){
    addListeners();
  }