db.collection("platillo").onSnapshot((datos) => {
    datos.docChanges().forEach((registro ) => {
       if (registro.type === "added"){
        mostrarPlatillo(registro.doc.data(),registro.doc.id);
      
       }
       if (registro.type === "modified"){
        actualizarPlatillo(registro.doc.data(),registro.doc.id);
       } 

       if (registro.type === "removed") {
        document.getElementById(registro.doc.id).remove();
}
    });
});

const formularioAgregar = document.querySelector("form");
formularioAgregar.addEventListener("submit",(e) =>{
        e.preventDefault();
        const platilloNuevo = {
            nombre: formularioAgregar.title.value,
            ingredientes: formularioAgregar.ingredients.value,
            precio: formularioAgregar.price.value
        }
    db.collection("platillo").add(platilloNuevo)
    .catch((error) => { 
        console.log(error);
        alert("Error al agregar platillo");
    });
    formularioAgregar.title.value = "";
    formularioAgregar.ingredients.value ="";
    formularioAgregar.price.value ="";
    alert("platillo agregado")
 
});


 function eliminarPlatillo(id){

    db.collection("platillo").doc(id).delete()
    .then(() => {
        console.log("Platillo eliminado");
    })
    .catch((error) => {
        console.log(error);
    });

}