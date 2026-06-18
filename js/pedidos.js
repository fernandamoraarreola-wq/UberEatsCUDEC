let contenidoLista =" ";

function agregarALista(platillo,id){
    contenidoLista = `<option value='${id}'>
    ${mostrarPlatillo.nombre}
    </option>`;
    document.getElementById('ListaPlatillos').innerHTML=
    contenidoLista;

}