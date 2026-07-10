document.addEventListener('DOMContentLoaded', function() {

  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
});

let contenidoLista =" ";
 
db.collection("platillo").onSnapshot((datos) => {
    datos.docChanges().forEach ((registro) =>{
        if (registro.type ==="added"){
            agregarALista(registro.doc.data(),registro.doc.id)
        }
    });
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems)
});
 
function agregarALista(platillo,id){
    contenidoLista+= `<option value =' ${id}'>
    ${platillo.nombre}
    </option>`;
    document.getElementById("ListaPlatillos").innerHTML =contenidoLista;
}

const btnPedido = document.getElementById("btnPedido");


btnPedido.addEventListener("click", () => {

    const platillo = document.getElementById("ListaPlatillos").value;
    const direccion = document.getElementById("direccion").value;

    db.collection("Pedidos").add({
        platillo: platillo,
        direccion: direccion
        
    })
    .then(() => {
        alert("Pedido realizado correctamente.");

        document.getElementById("direccion").value = "";
        document.getElementById("ListaPlatillos").selectedIndex = 0;

        M.FormSelect.init(document.querySelectorAll('select'));
    })
    .catch((error) => {
        console.error("Error al guardar el pedido:", error);
    });

});



document.getElementById("btnUbicacion").addEventListener("click", function(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exito, error);
}

    
});

function exito(posicion){
    let latitud = posicion.coords.latitude;
    let longitud = posicion.coords.longitude;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`, {
        headers: {
            'User-Agent': 'UberEatsFer (fernandamoraarreola@gmail.com)'
        }
    })


    
        .then(respuesta => respuesta.json())
        .then(data => {
            let ciudad =data.address.city;
            let pais = data.address.country;
            document.getElementById("direccion").value = `${ciudad}, ${pais}`;
            var map = L.map('mapa').setView([latitud, longitud], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://ww.openstreetmap.org/copyrigth">OpenStreetmap</a>'
            }).addTo(map);
            var marker = L.marker([latitud,longitud]).addTo(map);
        })
        
        

}
function error(error){
    alert("error al obtener la ubicacion")
    console.log(error);
}
M.AutoInit();