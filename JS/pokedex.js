const contenidoPokemon = document.querySelector(".pokemon-container")
//Establecemos un array vacio para pushear posteriormente la data de la api
let pokemonData = [];

//Llamamos a la api para poder obtener informacíon de la pokeapi
function fetchPokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)//Utilizamos el fetch para enviar la solicitud GET a la url y utilizamos el id como identificador del pokemon a consultar
    .then(res => res.json())//Definimos la función para recibir la promesa que devuelve el fetch y convertimos la respuesta del fetch en un objeto de javascript
    .then(data => {
      pokemonData.push(data);//pusheamos la dat de la api dentro del array vacio
      crearPokemon(data)
    })//Definimos esta función que se ejecuta despues de que se resuelva la promesa del then anterior y llamamos a la funcion crearPokemon para mostrar los datos del pokemon que nos hemos traido con el then     
}

//Iteramos la informacion proveniente de la api
function fetchPokemons(num) {
  for (let i = 1; i <= num; i++) {
    fetchPokemon(i);
  }
}
//Iniciamos el codigo respecto al filtro de busqueda
const filtroPokemon = document.querySelector("#filtroPokemon");

filtroPokemon.addEventListener("input", filtrarPokemons);//cuando escribamos sobre el input el filtro actuará

function filtrarPokemons() {
    const filtro = filtroPokemon.value.toLowerCase();//nos aseguramos que el valor se busque en minúsculas
  
    const pokemonFiltrados = pokemonData.filter((pokemon) =>//Si el nombre de un Pokémon contiene el valor del filtro, el objeto Pokémon se agrega a la nueva constante de pokemonFiltrados.
      pokemon.name.toLowerCase().includes(filtro)
    );
  
    contenidoPokemon.innerHTML = "";//Limpiamos el contenido actual del elemento HTML
  
    pokemonFiltrados.forEach((pokemon) => {//creamos una nueva lista basada en la constante pokemonFiltrados y agregamos los elementos y con el forEach lo que hacemos es recorrer los elementos de pokemonFiltrados
      crearPokemon(pokemon);
    });
}
// Inicializamos la funcion para poder representar mediante una tarjeta cada pokemon que busquemos en la api
function crearPokemon(pokemon){
    //Creamos la tarjeta que sera el contenedor de todos los elementos de información acerca del pokemon que queremos mostrar
    const contenedorPokemon = document.createElement("div");
    contenedorPokemon.classList.add("pokemon-tarjeta")
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
    numPokedex.classList.add("numero-pokemon");
    numPokedex.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;/*Para mostrar un numero estilo pokedex, necesitamos pasar el id a una cadena, para posteriormente con el padstar
    poder añadir un numero de longitud 3 y que añada dos 0 delante del id del pokemon y utilizamos el textContent para asignar el contenido del texto a numPokedex que es el parrafo*/
    //Con el nombre del pokemon que queremos mostrar hacemos exactamente lo mismo que anteriormente    
    const nombrePokemon = document.createElement("p");
    nombrePokemon.classList.add("nombrePokemon");
    nombrePokemon.textContent = pokemon.name;/*De nuevo con el textContent mostraremos en el elemento html de nombrePokemon en este caso el nombre del pokemon que sacamos del apartado name
    del objeto javascript*/
    //Generamos dos div para almacenar informacion adicional que traeremos de la api
    const mostrarDatos = document.createElement("div")
    mostrarDatos.classList.add("datos-pokemon")

    const datosAdicionales = document.createElement("div")
    datosAdicionales.classList.add("datos-adicionales")
    
    //Se generan 2 elementos de parrafo para mostrar la informacion de el tipo de pokemon y de la habilidad del mismo  
    const tipoPokemon = document.createElement("p");
    tipoPokemon.classList.add("tipoPokemon");
    tipoPokemon.textContent = "type:" + " " + pokemon.types[0].type.name
    datosAdicionales.appendChild(tipoPokemon);  
  
    
    const habilidadPokemon = document.createElement("p");
    habilidadPokemon.classList.add("habilidadPokemon");
    habilidadPokemon.textContent = `Habilidad: ${pokemon.abilities[0].ability.name}`
    datosAdicionales.appendChild(habilidadPokemon)

    //cuando hacemos click en el logo del arrow activamos el div y le damos los estilos correspondientes  
    mostrarDatos.addEventListener("click", function() {
      datosAdicionales.style.display = "flex" 
      datosAdicionales.style.justifyContent = "center"
      datosAdicionales.style.alignItems = "center"
      datosAdicionales.style.flexDirection = "column"  
    })
    //Cuando hagamos click fuera del elemento div, cambiaremos el display del div que estaba en flex a none
    document.addEventListener("click", function(event) {
      const dentroDatos = mostrarDatos.contains(event.target)//comprobamos si mostrarDatos contiene dentro el elemento sobre el que se ha hecho click y devuelve true
      const dentroDatosAdicionales = datosAdicionales.contains(event.target)//similar a la anterior pero con los datos adicionales
      if (!dentroDatos && !dentroDatosAdicionales) {/*si el elemento sobre el que se ha hecho click no esta dentro de mostrarDatos o datosAdicionales significa que
      has clickado fuera y por tanto queremos que el div se esconda mediante el display none*/
        datosAdicionales.style.display = "none"
      }
    })
    //Añadimos al contenedor principal la informacion
    contenedorPokemon.appendChild(contenedorImagen);
    contenedorPokemon.appendChild(numPokedex);
    contenedorPokemon.appendChild(nombrePokemon);
    contenidoPokemon.appendChild(contenedorPokemon)
    contenedorPokemon.appendChild(mostrarDatos)
    contenedorPokemon.appendChild(datosAdicionales) 
}
fetchPokemons(800)

