let modal = document.getElementById("miModal");

// Definimos el boton que abre el modal
let btn = document.getElementById("boton-interrogante");

// Declaramos el elemento span "X" que cierra el modal
let span = document.getElementsByClassName("cierre")[0];

// Cuando el usuario haga click en el boton, se abrirá el modal
btn.onclick = function() {
  modal.style.display = "block";
}

//Cuando el usuario haga click en el span "X" se cerrará el modal
span.onclick = function() {
    modal.style.display = "none";
}

// Si el usuario hace click en cualquier parte fuera del modal, desarapecerá
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}