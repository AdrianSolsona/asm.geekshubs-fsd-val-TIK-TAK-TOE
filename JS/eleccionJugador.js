//Recogemos la información de los inputs para el sessionStorage
const seleccionJugador = () => {

    let nombre1 = document.getElementById("nombreJugador1");
    let jugador1 = nombre1.value;
    sessionStorage.setItem("Nombre del jugador 1",JSON.stringify( jugador1));
    
    let nombre2 = document.getElementById("nombreJugador2");
    let jugador2 = nombre2.value;
    sessionStorage.setItem("Nombre del jugador 2",JSON.stringify(jugador2));
    //Si alguno de los inputs estan vacios, lanzamos alerta a ,los jugadores, sino pasamos al juego
    if(jugador1 == "" || jugador2 == ""){
        //alert("Tienes que poner algun nombre para los 2 jugadores")
        let mensaje = document.createElement("div");
            mensaje.innerHTML = "¡Tienes que introducir dos nombres válidos!<br><br> Cualquier caracter es válido <br> (Máximo de 20 caracteres)";
            mensaje.style.width = "30rem"
            mensaje.style.height = "10rem"
            mensaje.style.opacity = "0.7"
            mensaje.style.position = "fixed";
            mensaje.style.top = "37%";
            mensaje.style.left = "50%";
            mensaje.style.transform = "translate(-50%, -50%)";
            mensaje.style.backgroundColor = "rgb(229, 236, 16)";
            mensaje.style.fontFamily = "'Mochiy Pop One', sans-serif"
            mensaje.style.color = "rgb(60, 78, 199)"
            mensaje.style.textAlign = "center"
            mensaje.style.padding = "25px";
            mensaje.style.borderRadius = "7px";
            document.body.appendChild(mensaje);

            setTimeout(function () {
                mensaje.style.display = "none";
              }, 5000);
    }
    else{
        document.getElementById("irJuego").href="../pages/juego.html"
    }
}


