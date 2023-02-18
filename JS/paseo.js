//Declaramos las variables de personaje pokeballs y marcador
let personaje = document.getElementById("personaje");
let pokeballs = document.getElementsByClassName("pokeball");//Esto generará un HTML collection, con 5 objetos
let marcador = document.getElementById("marcador");
//Declaramos una variable que actuará como contador de las pokeballs atrapadas
let pokeballsAtrapadas = 4;
//Variable que representará a la roca en pantalla
let roca = document.getElementById("tapa-pokedex")
//Función encargada de detectar cuando el personaje pasa por delante de una pokeballs que tiene que recoger
let detectarColision = function() {
    setInterval(function() {//Introducimos un setInterval para hacer las comprobaciones constantemente respecto a si personaje colisiona con alguna pokeball
        let personajeRect = personaje.getBoundingClientRect();//getBoundClientRect se encarga de devolver el tamaño del elemento personaje y su posicion relativa respecto al viewport
        //Iteramos el HTML collection de pokeballs, hasta llegar a 5
        for (let i = 0; i < pokeballs.length; i++) {
            let pokeballRect = pokeballs[i].getBoundingClientRect();//similar a lo anterior con personaje, en este caso recogemos la pokeball concreta mediante el indice
            //Si la posicion en left y top del personaje respecto a la pokeball es menor y la posicion en right y bottom es mayor
            if (personajeRect.left < pokeballRect.right &&
                personajeRect.right > pokeballRect.left &&
                personajeRect.top < pokeballRect.bottom &&
                personajeRect.bottom > pokeballRect.top) {
                pokeballs[i].parentNode.removeChild(pokeballs[i]);//Accedemos al objeto padre con parentNode y recibimos el elemento hijo que deseamos eliminar con removeChild
                pokeballsAtrapadas++;//Cada vez que se cumplan las condiciones de colisión añadimos una pokeball al contador
            }
        }
        //Mostramos el contador y la variable pokeballsAtrapadas en el
        marcador.innerHTML = `Pokeballs atrapadas: ${pokeballsAtrapadas}/5`;
        //Si las pokeballsAtrapadas son 5, aparecerá un mensaje en el centro de la pantalla y se desplazara hacia la izquierda la piedra que tapa la pokedex
        if(pokeballsAtrapadas === 5){
            //Desplazamos la roca hacia la izquierda cuando el contador llegue a 5
            roca.style.transition = "left 2s"
            roca.style.left = "76.5%"
            //Definimos la variable mensaje que será un div que mostrará un mensaje, luego aplicamos los estilos al div(Igual que en CSS) 
            let mensaje = document.createElement("div");
            mensaje.innerHTML = "¡Has atrapado todas las pokeballs! <br> Haz click en la pokedex que estaba escondida";
            mensaje.style.position = "fixed";
            mensaje.style.top = "50%";
            mensaje.style.left = "50%";
            mensaje.style.transform = "translate(-50%, -50%)";
            mensaje.style.backgroundColor = "rgb(229, 236, 16)";
            mensaje.style.fontFamily = "'Mochiy Pop One', sans-serif"
            mensaje.style.color = "rgb(60, 78, 199)"
            mensaje.style.textAlign = "center"
            mensaje.style.padding = "25px";
            mensaje.style.borderRadius = "7px";
            document.body.appendChild(mensaje);//Queremos que el mensaje se muestre en el body de nuestro html
        }

    }, 50);
    
};

detectarColision();
//Definimos el numero de arboles y pokeballs que queremos que aparezcan en pantalla
let numeroArboles = 30;
let numeroBolas = 15;
//Iteramos hasta que el numero de arboles que se generen sea de 30 en este caso
function generacionArboles(){
    for(let i = 0; i < numeroArboles; i++){
        //Generamos un div al que le añadimos la clase arbol definida en nuestro css
        const div = document.createElement('div')
        div.classList.add('arbol')
        /* Seleccionamos el position left y top del div y utilizamos Math.random que genera un numero aleatorio entre 0 y 1,
         lo multiplicamos por 100 y lo mostramos en % para modificar su posicion*/
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}
//Igual a la anterior a expeción del z-index
function generacionPokeballs() {
    for(let i = 0; i < numeroBolas; i++){
        const div = document.createElement('div')
        div.classList.add('pokeballsFalsas')
        div.style.left = Math.random()  * 100 + "%"
        div.style.top = Math.random()  * 100 + "%"
        div.style.zIndex = "-1"
        document.body.appendChild(div)
    }
}
//Funcion para recoger las funciones de generación aleatoria
function generacionElementos(){
    generacionArboles()
    generacionPokeballs()
}

generacionElementos()

//Definimos la direccion por defecto
let direccion = "";
//Definimos una variable para posteiormente solo poder mover el personaje en caso de que presionemos una tecla, por default sera false
let moviendo = false;
//Iniciamos la funcion para el movimiento del jugador mediante las teclas
document.addEventListener("keydown", function(presionar) {//En esta linea queremos que todo el documento escuche las teclas que presionamos mediante el evento keydown
    /*Inciamos un switch con el evento, dependiendo de la flecha que presionemos el backgroundPosition del personaje cambiara para acceder al otro "frame" del spread
     de manera vertical y cambiara el valor de la variable dirección*/
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
//Cuando no estemos presionando ninguna tecla, moviendo sera false, igual que por defecto
window.addEventListener("keyup", function() {
    moviendo = false;
});
//Iniciamos un contador para almacenar el movimiento del jugador que ira sumando cada 250 ms
let contador = 0;

let animacionPersonaje = function(){
    setInterval(function(){
        personaje.style.backgroundPositionX = (50 * contador) + "px" //Cantidad de espacios a la derecha que movemos el personaje para pasar al siguiente sprite horizontalmente y de sensacion de caminar
        contador++;
    },250) //Valor del setInterval cambiara de posicion cada 250 milisegundos(0.25segundos)

}
//Declaramos los contadores de movimiento
let contadorMovimientoVertical = 0;
let contadorMovimientoHorizontal = 0;

let movimientoPersonaje = function(){
    setInterval(function(){
        //si moviendo es diferente a false el sprite se moverá
        if(!moviendo) {//Añadimos este if para que una vez hemos presionado una tecla para empezar a movernos, cuando volvamos a soltar esa tecla se pare, de lo contrario no pararia
            return;
        }
        //Dependiendo de la direccion el personaje se movera a partir de su position top o left una serie de pixeles fijos(20 en este caso multiplicado por el contador)
        //Contador el cual se ira incrementando o decrementando dependiendo de la direccion y cada 20 pixeles en este caso
        if(direccion == "abajo"){
            personaje.style.top = (20 * contadorMovimientoVertical) + "px"
            contadorMovimientoVertical++;
        }
        if(direccion == "arriba"){
            personaje.style.top = (20 * contadorMovimientoVertical) + "px"
            contadorMovimientoVertical--;
        }
        if(direccion == "derecha"){
            personaje.style.left = (20 * contadorMovimientoHorizontal) + "px"
            contadorMovimientoHorizontal++;
        }
        if(direccion == "izquierda"){
            personaje.style.left = (20 * contadorMovimientoHorizontal) + "px"
            contadorMovimientoHorizontal--;
        }
        /*Condiciones para evitar que el sprite se salga de la pantalla, si el contador se incrementa en x ocasiones a partir de ahí decrementarlo o incrementarlo
        Ya que llegado el contador a x cantidad el personaje estaria en el borde de la pantalla, hay que tenecer en cuenta que si modificamos el multiplicador de 
        las condiciones anteriores (20 en este caso), habria que modificar las cantidades de las dos ultimas condiciones*/

        //Para evitar que se salga por izquierda
        if(contadorMovimientoHorizontal <= 0){
            contadorMovimientoHorizontal++; 
        }
        //Para evitar que se salga por izquierda
        if(contadorMovimientoVertical <=0){
            contadorMovimientoVertical++;
        }
        //Para evitar que se salga por derecha
        if(contadorMovimientoHorizontal >= 94){
            contadorMovimientoHorizontal--;
        }
        //Para evitar que se salga por abajo
        if(contadorMovimientoVertical >= 45){
            contadorMovimientoVertical--
        }
    },450)
    
}

movimientoPersonaje()
animacionPersonaje()
