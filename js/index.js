let contenido ='';
btnAgregarPlatillo = document.getElementById('btnAgregarPlatillo');
document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
});

document.querySelector(".recipes").addEventListener("click", (e)=>{

    if(e.target.classList.contains("material-icons")){

        const id = e.target.dataset.id;
        eliminarPlatillo(id);
    }

});


function mostrarPlatillo(platillo,id){
  contenido += `<div class="card-panel recipe white row" 
  id="${id}">
  <div class="recipe-details">
       <div class ="recipe-title">
          ${platillo.nombre}
    </div>
    <div class="recipe-ingredients">
       ${platillo.ingredientes}
        <div class="recipe-precio">
      precio $${platillo.precio}
        </div>
        </div>
      <div class= "recipe-delete">
      <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
      </div>
    </div>`;
  document.querySelector('.recipes').innerHTML = contenido;
}

function actualizarPlatillo(platillo,id){
  let tarjeta = document.getElementById(`${id}`);
  tarjeta.querySelector(".recipe-title").innerHTML = platillo.nombre;
  tarjeta.querySelector(".recipe-ingredients").innerHTML = platillo.ingredientes;
   tarjeta.querySelector(".recipe-price").innerHTML = platillo.precio;
  
}

let streaming = false;
const width = 320;
let height = 0;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const foto = document.getElementById('foto');
const btnFoto = document.getElementById('btnFoto');      // Abrir cámara
const btnTomarFoto = document.getElementById('tomarFoto'); // Tomar foto
let streamActivo = null;


const btnBorrarFoto = document.createElement("button");
btnBorrarFoto.textContent = "Borrar Foto";
document.getElementById("salida").appendChild(btnBorrarFoto);


function abrirCamara(){
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false
    })
    .then((stream)=> {
        streamActivo = stream;
        video.srcObject = stream;
        video.style.display = "block"; // mostrar video
        video.play();
    })
    .catch((error) => {
        console.log(error);
    });
}

btnFoto.addEventListener("click", abrirCamara);

video.addEventListener("canplay", ()=>{
    if (!streaming){
        height = video.videoHeight / (video.videoWidth / width);
        video.setAttribute("width", width);
        video.setAttribute("height", height);
        streaming = true; 
    }
});

// Tomar foto
btnTomarFoto.addEventListener("click", ()=>{
    const contexto = canvas.getContext("2d");
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        contexto.drawImage(video, 0, 0, width, height);
        const fotoFinal = canvas.toDataURL("image/png");
        foto.setAttribute("src", fotoFinal);

        // detener cámara y ocultar video
        if(streamActivo){
            streamActivo.getTracks().forEach(track => track.stop());
            streamActivo = null;
        }
        video.style.display = "none"; // ocultar recuadro negro
    } else {
        limpiarFoto();
    }
});

// Borrar foto y reabrir cámara
btnBorrarFoto.addEventListener("click", ()=>{
    limpiarFoto();
    abrirCamara();
});

function limpiarFoto(){
    foto.src = "";
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
}
