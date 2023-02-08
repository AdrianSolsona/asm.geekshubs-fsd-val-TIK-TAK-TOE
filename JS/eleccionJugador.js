const seleccionJugador = () => {

    let nombre1 = document.getElementById("nombreJugador1");
    let jugador1 = nombre1.value;
    console.log(jugador1);
    sessionStorage.setItem("Nombre del jugador 1",JSON.stringify( jugador1));
    
    let nombre2 = document.getElementById("nombreJugador2");
    let jugador2 = nombre2.value;
    console.log(jugador2);

    sessionStorage.setItem("Nombre del jugador 2",JSON.stringify(jugador2));

    if(jugador1 == "" || jugador2 == ""){
        alert("Tienes que poner algun nombre para los 2 jugadores")
    }
    else{
        document.getElementById("irJuego").href="../pages/juego.html"
    }
}


