//Recibimos la información del sessionStorage y la mostramos en los divs del display izquierdo
let jugador1Storage = document.getElementById("nombreJug1");
jugador1Storage.innerHTML = JSON.parse(sessionStorage.getItem("Nombre del jugador 1"));

let jugador2Storage = document.getElementById("nombreJug2");
jugador2Storage.innerHTML = JSON.parse(sessionStorage.getItem("Nombre del jugador 2"));

//Establecemos las fichas del juego en este caso las imagenes de charmander y squirtle
let charmander = document.getElementById("charmanderCas").innerHTML = '<img id="charmanderCas" class="imagen-casilla" src="../images/charmander-peq-def1.png"></img>'
let squirtle = document.getElementById("squirtleCas").innerHTML = '<img id="squirtleCas" class="imagen-casilla sqr" src="../images/squirtle-peq-def1.png"></img>'

//charmander es el estado de inicio del juego
let turno = charmander;
//Inicio de todas las celdas vacias(9)
let tablero = [0,0,0,0,0,0,0,0,0]
//Contador de fichas restantes
let ficha1 = 3;
let ficha2 = 3;
//Componentes que queremos mostrar en el display izquierdo junto a la pantalla del jugador 1
let fraseTurno1 = document.getElementById("infoJugador1")
let textoTurno1 = document.getElementById("textoJugador1")
fraseTurno1.innerHTML = 3;
textoTurno1.innerHTML = "te quedan varios turnos"
//Inicio conteo de las fichas para el jugador 1, para saber cuantas fichas nos quedan por jugar
function contadorJugador1(){
    if(ficha1 > 1){
        fraseTurno1.innerHTML = ficha1
        textoTurno1.innerHTML = "Te quedan varios turnos"
    }
    else if(ficha1 === 1){
        fraseTurno1.innerHTML = ficha1
        textoTurno1.innerHTML = "Te queda un turno"
    }
    else{
        fraseTurno1.innerHTML = ""
        textoTurno1.innerHTML = "Te has quedado sin turnos"
    }
}
//Componentes que queremos mostrar en el display izquierdo junto a la pantalla del jugador 1
let fraseTurno2 = document.getElementById("infoJugador2")
let textoTurno2 = document.getElementById("textoJugador2")
fraseTurno2.innerHTML = 3;
textoTurno2.innerHTML = "te quedan varios turnos"

//Inicio conteo de las fichas para el jugador 2, para saber cuantas fichas nos quedan por jugar
function contadorJugador2(){
    if(ficha2 > 1){
        fraseTurno2.innerHTML = ficha2
        textoTurno2.innerHTML = "Te quedan varios turnos"
    }
    else if(ficha2 === 1){
        fraseTurno2.innerHTML = ficha2
        textoTurno2.innerHTML = "Te queda un turno"
    }
    else{
        fraseTurno2.innerHTML = ""
        textoTurno2.innerHTML = "Te has quedado sin turnos"
    }
}

//Función para cambiar de turno
function cambiarTurno(){

    turno = (turno == charmander) ? squirtle: charmander; //(Ternaria) si estamos en el turno "charmander", lo cambiamos a "squirtle" y si esta en "squirtle" cambiamos a "charmander"
}
//Inicio funcion para marcar la celda que tenemos seleccionada
function marcarCelda(celda){
    if((tablero[celda] === 0)  && (ficha1 > 0 || ficha2  > 0)){// si la celda esta vacia y las ficha que tiene por poner el jugador es mayor 0 
        (turno == charmander) ? ficha1-- : ficha2--;//Si el turno en el que nos encontramos es el de charmander decrementamos a ficha 1 sino a ficha2
        tablero[celda] = turno// Aqui guardamos el turno sea "y" o la "x"
        document.getElementById(celda).innerHTML = turno //Introduccimos el turno correspondiente en la celda
        cambiarTurno() // Cambiamos de turno
    }
    //Si la celda esta llena y ficha 1 o 2 son iguales a 0 ejecutaremos el else if
    else if((turno !== 0) && (ficha1 || ficha2 == 0)){
        //Si el turno es el de charmander al hacer click en la celda la dejaremos vacia y sumaremos a ficha1 una ficha
        if(turno == charmander){
            document.getElementById(celda).innerHTML = "";
            ficha1++
        }
        //Repeticion del if anterior pero con squirtle y ficha2
        else if(turno == squirtle){
            document.getElementById(celda).innerHTML = "";
            ficha2++
        }
        //Al realizar lo anterior la celda del tablero estara en 0, "vacia"
        tablero[celda] = 0;
    }
}

//Inicio de la Funcion al dar click sobre celda
function hacerClick(pos){
    marcarCelda(pos) //Aqui llamamos a la funcion de marcarCelda para que cuando hagamos click quede marcada
    validarGanador()//Comprobamos si hay un ganador
    contadorJugador1()//Conteo del numero de fichas restantes del jugador 1
    contadorJugador2()//Conteo del numero de fichas restantes del jugador 2
}
/*
//Inicio de la funcion de reset para la nueva partida
function volverJugar() {
    board = [0,0,0,0,0,0,0,0,0] //Volvemos a definir el array para resetearlo
    turno = charmander //Empezamos como en el primer turno de la primera partida
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = "" //Ponemos en blanco el tablero de nuevo(reemplazamos con cadena vacia)
    }
}
*/
//Función para mostrar al ganador
function ganadorFinal() {
        window.location.href = "../pages/ganador.html"
    
}

//Funcion para validar el ganador(analizaremos las lineas verticales, diagonales y horizontales cada vez que demos click sobre una celda)
//Se realizara la comprobación por cada click que hagamos
function validarGanador() {
    let pokemon = "" //definimos la variable pokemon como vacia
    let pokemons = [charmander,squirtle] //Definimos el array con las variables charmander y quirtle definidas al principio
    for (let o = 0; o < pokemons.length; o++) { // Analizamos por cada pokemon en cada iteracion si tenemos un ganador

        pokemon = pokemons[o]//Redefinimos la variable pokemon y le pasamos los indices del array pokemons

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

