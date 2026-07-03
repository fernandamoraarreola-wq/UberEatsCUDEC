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
M.AutoInit();
document.getElementById("btnUbicacion").addEventListener("click", function(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exito, error);
}

    
});

function exito(posicion){
    alert(posicion.coords.latitude + ", " + 
        posicion.coords.longitude);
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitud}&lon=${longitud}&format=json`,{
            headers:)
                'User-Argent':`UberEatsFer`(fernandamoraarreola@gmail.com)`

            }
        )

}
function error(){
    alert("error")
}
