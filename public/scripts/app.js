var player = 1;
var matrix = [[0,0,0],[0,0,0],[0,0,0]];
var tiro = "";
var pos = "";
var winner = 0;
var winn = false;

for (var i =1; i<=matrix.length; i++) {
    var row = document.getElementById("r"+i);
  for (var j=1; j<=3; j++) {
    var casilla = document.getElementById("r"+i).getElementsByClassName("column"+j)[0];
    casilla.onclick = play;
    row.onclick = play;
    //pos = row+ casilla;
  }
}

function changePlayer(){
  if(player == 2){
    player = 1;
  }else if (player ==1){
    player++;
  }
}
function is_complete(){
  var bool = true;
  for (var r = 1; r<=matrix.length;r++){
    for (var c= 1; c<=matrix.length;c++){
      if (matrix[r-1][c-1] == 0){
        bool = false;
      }
    }
  }
  return bool;
}
function draw (row,column){
  var colToAdd = document.getElementById("r"+row).getElementsByClassName("column"+column)[0];
  colToAdd.className += " symbol";
  if (colToAdd.innerHTML.length == 0){
    if (player == 1) {
      colToAdd.innerHTML='X';
    } else {
      colToAdd.innerHTML='O';
    }
    changePlayer();
  }
}
function getWinner(){
  //reviso la diagonal
  var magnitude = 0;
  var tiros = 0;
  magnitude += matrix[0][0];  
  magnitude += matrix[1][1];
  magnitude += matrix[2][2];
  if (matrix[0][0] != 0)
    tiros++;
  if (matrix[1][1] != 0)
    tiros++;
  if (matrix[2][2] != 0)
    tiros++;
  if ( ((magnitude == 3) || (magnitude == 6) ) && (tiros == 3) ){
    winn = true;
    winner = player;
    for (var r = 1; r<=3;r++){
      for (var c = 1; c<=3;c++){
        var colToAdd = document.getElementById("r"+r).getElementsByClassName("column"+c)[0];
        if (r == c)
        colToAdd.style.backgroundColor = "crimson";
      }
    }
  }
  magnitude = 0;
  tiros = 0;
  magnitude += matrix[0][2];
  magnitude += matrix[1][1];
  magnitude += matrix[2][0];
  if (matrix[0][2] != 0)
    tiros++;
  if (matrix[1][1] != 0)
    tiros++;
  if (matrix[2][0] != 0)
    tiros++;
  if ( ((magnitude == 3) || (magnitude == 6) ) && (tiros == 3) ){
    winn = true;
    winner = player;
    for (var r = 1; r<=3;r++){
      for (var c = 1; c<=3;c++){
        var colToAdd = document.getElementById("r"+r).getElementsByClassName("column"+c)[0];
        if ((r==1 && c==3) || (r==2 && c==2) || (r==3 && c==1))
        colToAdd.style.backgroundColor = "crimson";
      }
    }
  }

  //reviso las lineas horizontales
  for (i = 0; i < 3; i++){
    var magnitude = 0;
    var tiros = 0;
    for(j = 0; j < 3; j++){ 
      magnitude +=matrix[i][j];
      if (matrix[i][j] != 0)
        tiros++;
    }    
    if ( ((magnitude == 3) || (magnitude == 6) ) && (tiros == 3) ){
      var row = i + 1;
      var rowToPaint = document.getElementById("r"+row);
      rowToPaint.style.backgroundColor = "crimson";
      winn = true;
      winner = player;
      break;
    }   
  }
  //reviso las lineas verticales
  for (i = 0; i < 3; i++){
    var magnitude = 0;
    var tiros = 0;
    for(j = 0; j < 3; j++){ 
      magnitude +=matrix[j][i];
      if (matrix[j][i] != 0)
        tiros++;
    }    
    if ( ((magnitude == 3) || (magnitude == 6) ) && (tiros == 3) ){
      var col = i + 1;
      var rowToPaint = document.getElementsByClassName("column"+col);
      for (var i = 0; i<rowToPaint.length;i++){
        rowToPaint[i].style.backgroundColor = "crimson";
      }
      winn = true;
      winner = player;
      break;
    }   
  }
  if (winner == 0 && is_complete()){ //en el caso de un empate, nadie gana
    winn = true;
  }
}
function play(){
  var idcasilla = this.id;
  pos += idcasilla;
  tiro = pos;
  if (tiro.includes("col")){
    tiro = pos.replace("col","");
    if (tiro.includes("r")){
 ;     tiro = tiro.replace("r","_");
      console.log("Tiro (columna_fila): "+tiro);
      //cuando ya tiro
      var column = tiro.split("_")[0];
      var row = tiro.split("_")[1];
      console.log(player);
      if ((matrix[row-1][column-1] == 0) && !winn){
        matrix[row-1][column-1] = player;
        console.log(matrix);
        getWinner();
        console.log(winn,winner);
        draw(row,column);
        if (winn){
          var resultado = document.getElementById("final");
          var reset = document.getElementById("reset");
          if (winner > 0){
            resultado.innerHTML += "El resultado es: Ganó jugador "+winner;
          }else{
            resultado.innerHTML += "El resultado es: Empate!";
          }
          reset.style.display = "block";
          reset.onclick = reset_page;
        }
      }
      tiro="";
      pos="";
    }
  }
}
function reset_page(){
  location.reload();
}
