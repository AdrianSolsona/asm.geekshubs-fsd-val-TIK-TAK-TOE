const contenidoPokemon = document.querySelector(".pokemon-container")
//Llamamos a la api para poder obtener informacíon de la pokeapi
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)//Utilizamos el fetch para enviar la solicitud GET a la url y utilizamos el id como identificador del pokemon a consultar
    .then(res => res.json())//Definimos la función para recibir la promesa que devuelve el fetch y convertimos la respuesta del fetch en un objeto de javascript
    .then(data => {
        crearPokemon(data)
    })//Definimos esta función que se ejecuta despues de que se resuelva la promesa del then anterior y llamamos a la funcion crearPokemon para mostrar los datos del pokemon que nos hemos traido con el then     
}
//Utilizamos la funcion definida anteriormente para obtener los datos de una cantidad de pokemon determinada
function fetchPokemons (num){
    /*recorremos con un bucle for la secuencia de 1 hasta num(si fuera 0 daria un pequeño error ya que en 0 la api no devuelve nada, el primer pokemon esta en 1),
    y llamamos a la función anterior pasando num como argumento para obtener los datos del pokemon correspondiente*/
    for (let i = 1; i <= num; i++) {
        fetchPokemon(i)   
    }
}
// Inicializamos la funcion para poder representar mediante una tarjeta cada pokemon que busquemos en la api
function crearPokemon(pokemon){
    //Creamos la tarjeta que sera el contenedor de todos los elementos de información acerca del pokemon que queremos mostrar
    const contenedorPokemon = document.createElement("div");
    contenedorPokemon.classList.add("Pokemon-tarjeta")
    //Creamos el contenedor donde se alojará la imagen de cada pokemón
    const contenedorImagen = document.createElement("div");
    contenedorImagen.classList.add("img-contenedor");
    /*Aqui creamos un div para alojar la imagen del pokemón que extraemos de .sprites.front_default(la imagen se encuentra en el apartado sprites del objeto javascript que hemos convertido
    con el json de la función fetchPokemon y luego dentro de sprites seleccionamos la imagen de frente entre las diferentes opciones dentro del apartado sprites)*/
    const imgPokemon = document.createElement("img");
    imgPokemon.src = pokemon.sprites.front_default;
    //Queremos que la imagen del pokemon se encuentre en el contenedorImagen    
    contenedorImagen.appendChild(imgPokemon);
    //Creamos un elemento parrafo para mostrar el numero de la pokedex que tiene el pokemón
    const numPokedex = document.createElement("p");
    numPokedex.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;/*Para mostrar un numero estilo pokedex, necesitamos pasar el id a una cadena, para posteriormente con el padstar
    poder añadir un numero de longitud 3 y que añada dos 0 delante del id del pokemon y utilizamos el textContent para asignar el contenido del texto a numPokedex que es el parrafo*/
    //Con el nombre del pokemon que queremos mostrar hacemos exactamente lo mismo que anteriormente    
    const nombrePokemon = document.createElement("p");
    nombrePokemon.classList.add("nombrePokemon");
    nombrePokemon.textContent = pokemon.name;/*De nuevo con el textContent mostraremos en el elemento html de nombrePokemon en este caso el nombre del pokemon que sacamos del apartado name
    del objeto javascript*/
    //Añadimos al contenedor principal
    contenedorPokemon.appendChild(contenedorImagen);
    contenedorPokemon.appendChild(numPokedex);
    contenedorPokemon.appendChild(nombrePokemon);

    contenidoPokemon.appendChild(contenedorPokemon)
  
}
fetchPokemons(7)