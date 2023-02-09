
let personaje = document.getElementById("personaje");

let contador = 0;
let numeroArboles = 30;
let numeroEdificios = 8;
let numeroBolas =10;

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
        div.style.left = (Math.random()  * 100 + "%")
        div.style.top = Math.random()  * 100 + "%"
        document.body.appendChild(div)
    }
}

function generacionEdificios(){
    for(let i = 0; i < numeroEdificios; i++){
        const div = document.createElement('div')
        div.classList.add('edificios')
        div.style.left = (Math.random() * 100 + "%")
        div.style.top = Math.random() * 100 + "%"
        document.body.appendChild(div) 
    }
    
}
function generacionElementos(){
    generacionArboles()
    generacionPokeballs()
    generacionEdificios()
}

generacionElementos()

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
    },250) //Valor del setInterval cambiara de posicion cada 250 milisegundos(0.25segundos)

    

}


let contadorMovimientoVertical = 0;
let contadorMovimientoHorizontal = 0;

let movimientoPersonaje = function(){
    setInterval(function(){
        
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
