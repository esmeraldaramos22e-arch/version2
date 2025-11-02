const botonDocente = document.getElementById("botonDocente");
const botonVolver = document.getElementById("botonVolver");
const entradaTexto = document.getElementById("entradaTexto");
const publicar = document.getElementById("publicar");
const publicacionesDiv = document.getElementById("publicaciones");
const texto = document.getElementById("texto");

let modoDocente = false;

// Cargar publicaciones guardadas
let publicaciones = JSON.parse(localStorage.getItem("publicaciones")) || [];
mostrarPublicaciones();

// --- FUNCIONES ---
botonDocente.onclick = () => {
  const pass = prompt("Ingrese la contraseña:");
  if (pass === "1234") {
    modoDocente = true;
    document.body.classList.add("modo-docente");
    entradaTexto.style.display = "block";
    botonDocente.style.display = "none";
    botonVolver.style.display = "inline-block";
  } else if (pass !== null) {
    alert("Contraseña incorrecta.");
  }
};

botonVolver.onclick = () => {
  modoDocente = false;
  document.body.classList.remove("modo-docente");
  entradaTexto.style.display = "none";
  botonDocente.style.display = "inline-block";
  botonVolver.style.display = "none";
  mostrarPublicaciones();
};

publicar.onclick = () => {
  const textoPublicacion = texto.value.trim();
  if (textoPublicacion === "") return alert("Escribe algo antes de publicar.");
  
  const nueva = {
    id: Date.now(),
    texto: textoPublicacion
  };
  
  publicaciones.unshift(nueva);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  texto.value = "";
  mostrarPublicaciones();
};

function mostrarPublicaciones() {
  publicacionesDiv.innerHTML = "";
  publicaciones.forEach(pub => {
    const div = document.createElement("div");
    div.className = "tarjeta";
    div.innerHTML = `
      <p>${pub.texto}</p>
      ${modoDocente ? `<button class='eliminar' onclick='eliminar(${pub.id})'>✕</button>` : ""}
    `;
    publicacionesDiv.appendChild(div);
  });
}

function eliminar(id) {
  if (!modoDocente) return;
  publicaciones = publicaciones.filter(p => p.id !== id);
  localStorage.setItem("publicaciones", JSON.stringify(publicaciones));
  mostrarPublicaciones();
}
