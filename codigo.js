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
        let claseResuelto = anadirEstiloResuelto(item.id-1);
        let row = `
        <tr class="${claseResuelto}" id="tr${item.id}">
            <th scope="row">${item.id}</th>
            <td><input id="check${item.id}" type="checkbox" onclick="tacharItem(${item.id})"></td>
            <td>${item.tarea}</td>
            <td>${item.fechaCreacion}</td>
            <td>${item.fechaRealizacion}</td>
            <td><img width="5%" src="/images/TachoBorrar.png" onclick="borrar(${item.id})"></td>
        </tr>`;
        chequearItem(item.id-1);
        document.getElementById('tableBody').innerHTML += row;
    });
}

const anadirEstiloResuelto = (id) =>{
    let retorno;
    console.log(items[id].Realizado);
    if (items[id].Realizado)
    {
        retorno = "resuelto";
    }
    return retorno;
}
const chequearItem = (id) =>{
    console.log(items[id].Realizado);
    if (items[id].Realizado)
    {
        document.getElementById('check' + items[id].id).checked = true;
    }
}
/*const crearObjeto = (id, nombre, fechaCreacion, fechaRealizacion, realizado) =>{
    let objeto ={
        Id: id,
        Nombre: nombre,
        FechaCreacion: fechaCreacion,
        FechaRealizacion: fechaRealizacion,
        Realizado: realizado
    }
    return objeto;
} 
ESTO TODAVÍA NO FUNCIONA*/

const obtenerId = (id) => id++;


const tacharItem = (id) =>{
    const bodyItem = document.getElementById('tr' + id);
    bodyItem.classList.toggle('resuelto');
    items[id-1].fechaRealizacion = calcularFechaRealizacion(id-1);
    refrescarPagina();
}

const calcularFechaRealizacion = (id) =>{
    let yaFueRealizado = items[id].Realizado;
    let fechaRealizado;
    if (!yaFueRealizado)
    {
        fechaRealizado = new Date().toLocaleString()
        items[id].Realizado = true;
    }
    else
    {
        fechaRealizado = "N/A";
        items[id].Realizado = false;
    }
    return fechaRealizado;
}

const borrar = (itemB) => {
    let indice = items.map(item => item.id).indexOf(itemB);
    console.log(indice);
    items.splice(indice, 1);
    for(let i = indice; i <items.length; i++){
        items[i].id--;
    }
    refrescarPagina();
}

const borrarTodo = () => {
    items = [];
    refrescarPagina();
}