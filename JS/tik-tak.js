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

let eliminacionFicha = false;
//Componentes que queremos mostrar en el display izquierdo junto a la pantalla del jugador 1
let fraseTurno1 = document.getElementById("infoJugador1")
let textoTurno1 = document.getElementById("textoJugador1")
fraseTurno1.innerHTML = 3;
textoTurno1.innerHTML = "Te quedan varios turnos"
//Estilos de la frase y del numero de turno en el dipslay del jugador 1
fraseTurno1.style.color = "rgba(236, 0, 0, 0.733)"
textoTurno1.style.color = "orange"
fraseTurno1.style.fontFamily = "'Mochiy Pop One', sans-serif"
textoTurno1.style.fontFamily = "'Mochiy Pop One', sans-serif" 

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
        textoTurno1.innerHTML = "¡Te has quedado sin turnos!"
    }
}
//Componentes que queremos mostrar en el display izquierdo junto a la pantalla del jugador 1
let fraseTurno2 = document.getElementById("infoJugador2")
let textoTurno2 = document.getElementById("textoJugador2")
fraseTurno2.innerHTML = 3;
textoTurno2.innerHTML = "Te quedan varios turnos"
//Estilos de la frase y del numero de turno en el dipslay del jugador 2
fraseTurno2.style.color = "rgba(236, 0, 0, 0.733)"
textoTurno2.style.color = "orange"
fraseTurno2.style.fontFamily = "'Mochiy Pop One', sans-serif"
textoTurno2.style.fontFamily = "'Mochiy Pop One', sans-serif" 


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
        textoTurno2.innerHTML = "¡Te has quedado sin turnos!"
    }
}

//Función para cambiar de turno
function cambiarTurno(){

    turno = (turno == charmander) ? squirtle: charmander; //(Ternaria) si estamos en el turno "charmander", lo cambiamos a "squirtle" y si esta en "squirtle" cambiamos a "charmander"
}

//Inicio funcion para marcar la celda que tenemos seleccionada
function marcarCelda(celda){
    if((tablero[celda] === 0)  && (ficha1 > 0 || ficha2  > 0)){// si la celda esta vacia y las ficha que tiene por poner el jugador es mayor 0
        //Aqui comprobamos en que turno nos encontramos y el numero de fichas restantes del turno, esto es para añadir un condicion que no nos permita agarrar una ficha que corresponda al otro turno
        if ((turno === charmander && ficha1 > 0) || (turno === squirtle && ficha2 > 0)){
            (turno == charmander) ? ficha1-- : ficha2--;//Si el turno en el que nos encontramos es el de charmander decrementamos a ficha 1 sino a ficha2
            tablero[celda] = turno// Aqui guardamos el turno sea "y" o la "x"
            document.getElementById(celda).innerHTML = turno //Introduccimos el turno correspondiente en la celda
            cambiarTurno() // Cambiamos de turno
            ultimaFicha = celda;
            eliminacionFicha = false//El jugador no ha seleccionado una ficha para eliminar del tablero
        }
    }
    //Si la celda esta llena y ficha 1 o 2 son iguales a 0 y la variable elminacionFicha es igual a false ejecutaremos el else if
    else if (tablero[celda] === turno && ficha1 === 0 && ficha2 === 0 && eliminacionFicha === false) {
        document.getElementById(celda).innerHTML = "";
        eliminacionFicha = true;//El jugador ha seleccionado una ficha para eliminar del tablero
        //Dependiendo de quien sea el turno sumamos al primer jugador o segundo jugador
        if (turno === charmander) {
            ficha1++;
        } 
        else{
            ficha2++;
        }
        tablero[celda] = 0;//Restablecemos la celda correspondiente como vacia despues de haber retirado una ficha
    }
}   
//Inicio de la Funcion al dar click sobre celda
function hacerClick(pos){
    marcarCelda(pos) //Aqui llamamos a la funcion de marcarCelda para que cuando hagamos click quede marcada
    validarGanador()//Comprobamos si hay un ganador
    contadorJugador1()//Conteo del numero de fichas restantes del jugador 1
    contadorJugador2()//Conteo del numero de fichas restantes del jugador 2
}
//Función para mostrar al ganador

//Funcion para validar el ganador(analizaremos las lineas verticales, diagonales y horizontales cada vez que demos click sobre una celda)
//Se realizara la comprobación por cada click que hagamos
function validarGanador() {
    let pokemon = "" //definimos la variable pokemon como vacia
    let pokemons = [charmander,squirtle] //Definimos el array con las variables charmander y quirtle definidas al principio
    for (let o = 0; o < pokemons.length; o++) { // Analizamos por cada pokemon en cada iteracion si tenemos un ganador

        pokemon = pokemons[o]//Redefinimos la variable pokemon y le pasamos los indices del array pokemons

        //Combinaciones horizontales

        if(tablero[0] == pokemon && tablero && tablero[1] == pokemon && tablero [2] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
        if(tablero[3] == pokemon && tablero && tablero[4] == pokemon && tablero [5] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
        if(tablero[6] == pokemon && tablero && tablero[7] == pokemon && tablero [8] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }    
        }
        //Combinaciones Verticales

        if(tablero[0] == pokemon && tablero && tablero[3] == pokemon && tablero [6] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
        if(tablero[1] == pokemon && tablero && tablero[4] == pokemon && tablero [7] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
        if(tablero[2] == pokemon && tablero && tablero[5] == pokemon && tablero [8] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
        //Combinaciones diagonales

        if(tablero[0] == pokemon && tablero && tablero[4] == pokemon && tablero [8] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
        if(tablero[2] == pokemon && tablero && tablero[4] == pokemon && tablero [6] == pokemon){
            if(pokemon == charmander) {
                window.location.href = "../pages/ganadorCharmander.html";
              } else if(pokemon == squirtle) {
                window.location.href = "../pages/ganadorSquirtle.html";
              }
        }
    }
}

