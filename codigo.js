/*FALTA TACHAR LOS ITEMS, BOTÓN BORRAR TODO, CALCULAR CUÁNDO FUE REALIZADO EL
ITEM, BOTÓN DE QUÉ TAREA FUE LA MÁS RÁPIDA EN REALIZARSE*/

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
        fechaCreacion:new Date().toLocaleString(),
        realizado:false,
        fechaRealizacion:"N/A"
    }
    items.push(objeto);
    refrescarPagina();
}
const refrescarPagina = () =>{
    bodyTabla.innerText = "";
    items.forEach(item =>{
        let row = `
        <tr id="tr${item.id}">
            <th scope="row">${item.id}</th>
            <td><input id="check${item.id}" type="checkbox" onclick="tacharItem(${item.id})"></td>
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


const tacharItem = (id) =>{
    const bodyItem = document.getElementById('tr' + id);
    console.log(bodyItem);
    bodyItem.classList.toggle('resuelto');
}
