let personaje = document.getElementById("personaje");
let pokeballs = document.getElementsByClassName("pokeball");
let marcador = document.getElementById("marcador");

let pokeballsAtrapadas = 0;

let detectarColision = function() {
    setInterval(function() {
        let personajeRect = personaje.getBoundingClientRect();
        
        for (let i = 0; i < pokeballs.length; i++) {
            let pokeballRect = pokeballs[i].getBoundingClientRect();
            
            if (personajeRect.left < pokeballRect.right &&
                personajeRect.right > pokeballRect.left &&
                personajeRect.top < pokeballRect.bottom &&
                personajeRect.bottom > pokeballRect.top) {
                pokeballs[i].parentNode.removeChild(pokeballs[i]);
                console.log("Ha habido una colisión!");
                pokeballsAtrapadas++;
                break;
            }
        }
        marcador.innerHTML = `Pokeballs atrapadas: ${pokeballsAtrapadas}/5`;
    }, 50);
};

detectarColision();

let contador = 0;
let numeroArboles = 30;
let numeroEdificios = 6;
let numeroBolas = 15;

function generacionArboles(){
    for(let i = 0; i < numeroArboles; i++){
        const div = document.createElement('div')
        div.classList.add('arbol')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}
function generacionPokeballs() {
    for(let i = 0; i < numeroBolas; i++){
        const div = document.createElement('div')
        div.classList.add('pokeball')
        div.style.left = Math.random()  * 100 + "%"
        div.style.top = Math.random()  * 100 + "%"
        document.body.appendChild(div)
    }
}

function generacionElementos(){
    generacionArboles()
    generacionPokeballs()
    //generacionEdificios()
}

generacionElementos()

//Definimos la direccion por defecto
let direccion = "";
let moviendo = false;
//Iniciamos la funcion para el movimiento del jugador mediante las teclas
document.addEventListener("keydown", function(presionar) {//En esta linea queremos que todo el documento escuche las teclas que presionamos mediante el evento keydown
    //Inciamos un switch con el evento, dependiendo de la flecha que presionemos el backgroundPosition del personaje cambiara para acceder al otro "frame" del spread y cambiara el valor de la variable dirección
    switch (presionar.key) {
        case "ArrowDown":
            personaje.style.backgroundPositionY = "0px";
            direccion = "abajo"
            moviendo = true;
            break;
        case "ArrowUp":
            personaje.style.backgroundPositionY = "56.5px";
            direccion = "arriba"
            moviendo = true;
            break;
        case "ArrowRight":
            personaje.style.backgroundPositionY = "113px";
            direccion = "derecha"
            moviendo = true;
            break;
        case "ArrowLeft":
            personaje.style.backgroundPositionY = "169.5px";
            direccion = "izquierda"
            moviendo = true;
            break;
    }
});

window.addEventListener("keyup", function() {
    moviendo = false;
});


var animacionPersonaje = function(){
    setInterval(function(){
        personaje.style.backgroundPositionX = (50 * contador) + "px" //Cantidad de espacios a la derecha que movemos el personaje para pasar al siguiente sprite
        contador++;
    },250) //Valor del setInterval cambiara de posicion cada 250 milisegundos(0.25segundos)

}





let contadorMovimientoVertical = 0;
let contadorMovimientoHorizontal = 0;

let movimientoPersonaje = function(){
    setInterval(function(){

        if (!moviendo) {
            return;
        }
        
        if(direccion == "abajo"){
            personaje.style.top = (9 * contadorMovimientoVertical) + "px"
            contadorMovimientoVertical++;
        }
        if(direccion == "arriba"){
            personaje.style.top = (9 * contadorMovimientoVertical) + "px"
            contadorMovimientoVertical--;
        }
        if(direccion == "derecha"){
            personaje.style.left = (9 * contadorMovimientoHorizontal) + "px"
            contadorMovimientoHorizontal++;
        }
        if(direccion == "izquierda"){
            personaje.style.left = (9 * contadorMovimientoHorizontal) + "px"
            contadorMovimientoHorizontal--;
        }
        if(contadorMovimientoHorizontal <= 0){
            contadorMovimientoHorizontal++; 
        }
        if(contadorMovimientoVertical <=0){
            contadorMovimientoVertical++;
        }
        if(contadorMovimientoHorizontal >= 209){
            contadorMovimientoHorizontal--;
        }
        if(contadorMovimientoVertical >= 99){
            contadorMovimientoVertical--
        }
    },450)
    
}

movimientoPersonaje()
animacionPersonaje()
