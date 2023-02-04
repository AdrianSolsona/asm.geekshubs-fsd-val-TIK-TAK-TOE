//Establecemos las fichas del juego en este caso las imagenes de charmander y squirtle
let charmander = document.getElementById("charmanderCas").innerHTML = '<img id="charmanderCas" class="imagen-casilla" src="../images/charmander-peq-def1.png"></img>'
let squirtle = document.getElementById("squirtleCas").innerHTML = '<img id="squirtleCas" class="imagen-casilla sqr" src="../images/squirtle-peq-def1.png"></img>'

//y es el estado de inicio del juego
let turno = charmander;
//Inicio de todas las celdas vacias(9)
let tablero = [0,0,0,0,0,0,0,0,0]

//Función para cambiar de turno
function cambiarTurno(){

    turno = (turno == charmander) ? squirtle: charmander; //(Ternaria) si estamos en el turno "y", lo cambiamos a "x" y si esta en "x" cambiamos a "y"
}
//Inicio funcion para marcar la celda que tenemos seleccionada
function marcarCelda(celda){
    if(tablero[celda] === 0){// di la celda esta vacia realizaremos lo siguiente

        tablero[celda] = turno// Aqui guardamos el turno sea "y" o la "x"
        document.getElementById(celda).innerHTML = turno //Introduccimos el turno correspondiente en la celda
        cambiarTurno() // Cambiamos de turno
    }
}

//Inicio de la Funcion al dar click sobre celda
function hacerClick(pos){
    marcarCelda(pos) //Aqui llamamos a la funcion de marcarCelda para que cuando hagamos click quede marcada
    validarGanador()//Comprobamos si hay un ganador
}

//Inicio de la funcion de reset para la nueva partida

function volverJugar() {
    board = [0,0,0,0,0,0,0,0,0] //Volvemos a definir el array para resetearlo
    turno = charmander //Empezamos como en el primer turno de la primera partida
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = "" //Ponemos en blanco el tablero de nuevo(reemplazamos con cadena vacia)
    }
    
    //document.getElementById("message")
}

//Función para mostrar al ganador
function ganadorFinal() {
        window.location.href = "../pages/ganador.html"
    //document.getElementById("message").innerHTML = ganador
}

//Funcion para validar el ganador(analizaremos las lineas verticales, diagonales y horizontales cada vez que demos click sobre una celda)
//Se realizara la comprobación por cada click que hagamos
function validarGanador() {
    let pokemon = ""
    let pokemons = [charmander,squirtle]
    for (let o = 0; o < pokemons.length; o++) { // Analizamos por cada pokemon si tenemos un ganador

        pokemon = pokemons[o]

        //Combinaciones horizontales

        if(tablero[0] == pokemon && tablero && tablero[1] == pokemon && tablero [2] == pokemon){ganadorFinal("ganador" + pokemon)}
        if(tablero[3] == pokemon && tablero && tablero[4] == pokemon && tablero [5] == pokemon){ganadorFinal("ganador" + pokemon)}
        if(tablero[6] == pokemon && tablero && tablero[7] == pokemon && tablero [8] == pokemon){ganadorFinal("ganador" + pokemon)}
        //Combinaciones Verticales

        if(tablero[0] == pokemon && tablero && tablero[3] == pokemon && tablero [6] == pokemon){ganadorFinal("ganador" + pokemon)}
        if(tablero[1] == pokemon && tablero && tablero[4] == pokemon && tablero [7] == pokemon){ganadorFinal("ganador" + pokemon)}
        if(tablero[2] == pokemon && tablero && tablero[5] == pokemon && tablero [8] == pokemon){ganadorFinal("ganador" + pokemon)}
        //Combinaciones diagonales

        if(tablero[0] == pokemon && tablero && tablero[4] == pokemon && tablero [8] == pokemon){ganadorFinal("ganador" + pokemon)}
        if(tablero[2] == pokemon && tablero && tablero[4] == pokemon && tablero [6] == pokemon){ganadorFinal("ganador" + pokemon)}
    }
}

