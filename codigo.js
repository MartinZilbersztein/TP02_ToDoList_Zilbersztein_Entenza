let items = [];
const contenedor = document.getElementsByClassName("items");
const botonEnviar = document.getElementById('boton');
const bodyTabla = document.getElementById('tableBody');
let id = 0;

const anadirItem = () =>{
    let idObjeto = obtenerId(items.length+1);
    let objeto = {
        id:obtenerId(idObjeto),
        tarea:document.getElementById('descripcion').value,
        fechaCreacion:new Date(),
        realizado:false,
        fechaRealizacion:null
    }
    items.push(objeto);
    refrescarPagina();
}
const refrescarPagina = () =>{
    bodyTabla.innerText = "";
    items.forEach(item =>{
        let row = `
        <tr>
            <th scope="row">${item.id}</th>
            <td><input type="checkbox"></td>
            <td>${item.tarea}</td>
            <td>${item.fechaCreacion}</td>
            <td>${item.fechaRealizacion}</td>
        </tr>`;
        document.getElementById('tableBody').innerHTML += row;
    });
}
const crearObjeto = (id, nombre, fechaCreacion, fechaRealizacion, realizado) =>{
    let objeto ={
        Id: id,
        Nombre: nombre,
        FechaCreacion: fechaCreacion,
        FechaRealizacion: fechaRealizacion,
        Realizado: realizado
    }
    return objeto;
}

const obtenerId = (id) => id++;

