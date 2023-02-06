
let personaje = document.getElementById("personaje");
let contador = 0;
let numeroArboles = 30;

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
    for(let i = 0; i < numeroArboles; i++){
        const div = document.createElement('div')
        div.classList.add('pokeball')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}

generacionArboles()
generacionPokeballs()
let direccion = "abajo";

let abajo = function(){
    console.log("moviendose hacia abajo")
    personaje.style.backgroundPositionY = "0px"
    direccion = "abajo"
}
let arriba = function(){
    console.log("moviendose hacia arriba")
    personaje.style.backgroundPositionY = "56.5px"
    direccion = "arriba"
}
let derecha = function(){
    console.log("moviendose hacia derecha")
    personaje.style.backgroundPositionY = "113px"
    direccion = "derecha"
}
let izquierda = function(){
    console.log("moviendose hacia izquierda")
    personaje.style.backgroundPositionY = "169.5px"
    direccion = "izquierda"
}

var animacionPersonaje = function(){
    setInterval(function(){
        personaje.style.backgroundPositionX = (50 * contador) + "px" //Cantidad de espacios a la derecha que movemos el personaje para pasar al siguiente sprite
        contador++;
    },280) //Valor del setInterval cambiara de posicion cada 300 milisegundos(0.3segundos)
}




let contadorMovimientoVertical = 0;
let contadorMovimientoHorizontal = 0;

let movimientoPersonaje = function(){
    setInterval(function(){
        
        if(direccion == "abajo"){
            personaje.style.top = (8 * contadorMovimientoVertical) + "px"
            contadorMovimientoVertical++;
        }
        if(direccion == "arriba"){
            personaje.style.top = (8 * contadorMovimientoVertical) + "px"
            contadorMovimientoVertical--;
        }
        if(direccion == "derecha"){
            personaje.style.left = (8 * contadorMovimientoHorizontal) + "px"
            contadorMovimientoHorizontal++;
        }
        if(direccion == "izquierda"){
            personaje.style.left = (8 * contadorMovimientoHorizontal) + "px"
            contadorMovimientoHorizontal--;
        }
        if(contadorMovimientoHorizontal <= 0){
            contadorMovimientoHorizontal++;
            
        }
        if(contadorMovimientoVertical <=0){
            contadorMovimientoVertical++;
        }
        if(contadorMovimientoHorizontal >= 235){
            contadorMovimientoHorizontal--;
        }
        if(contadorMovimientoVertical >= 112){
            contadorMovimientoVertical--
        }
    },300)
}

movimientoPersonaje()
animacionPersonaje()
