let items = [];
const contenedor = document.getElementsByClassName("items");
const botonEnviar = document.getElementById('boton');

const anadirItem = () =>{
    let objeto = {
        tarea:document.getElementById('descripcion').value,
        fechaCreacion:new Date(),
        realizado:false,
        fechaRealizacion:null
    }
    items.push(objeto);
    console.log(items);
    refrescarPagina();
}
const refrescarPagina = () =>{
    items.forEach(item =>{
        let contenedorItem = document.createElement("p");
        contenedorItem.innerText = item.tarea;
        contenedor.appendChild(contenedorItem);
    })
}


for (let i = 0; i < items.length; i++)
{
    

}

