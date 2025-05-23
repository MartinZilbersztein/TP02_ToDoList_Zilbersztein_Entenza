/*BOTÓN DE QUÉ TAREA FUE LA MÁS RÁPIDA EN REALIZARSE*/

let items = [];
const contenedor = document.getElementsByClassName("items");
const botonEnviar = document.getElementById('boton');
const bodyTabla = document.getElementById('tableBody');
const textoTarea = document.getElementById('tarearapida');
let id = 0;

const anadirItem = () =>{
    let idObjeto = obtenerId(items.length+1);
    let objeto = {
        id:obtenerId(idObjeto),
        tarea:document.getElementById('descripcion').value,
        fechaCreacion:new Date(),
        realizado:false,
        fechaRealizacion:"N/A"
    }
    if(objeto.tarea.trim().length == 0){
        let devEnviar = document.getElementById('devEnviar');
        devEnviar.style.color="red";
        devEnviar.innerHTML = `No se puede enviar una tarea vacía`;
    }
    else{
        devEnviar.innerHTML = ``;
        items.push(objeto);
        refrescarPagina();
    }
}
const refrescarPagina = () =>{
    bodyTabla.innerText = "";
    items.forEach(item =>{
        let claseResuelto = anadirEstiloResuelto(item.id-1);
        console.log("el item fue realizado " + item.realizado);
        let row = `
        <tr class="${claseResuelto}" id="tr${item.id}">
            <th scope="row">${item.id}</th>
            <td><input id="check${item.id}" type="checkbox" onclick="tacharItem(${item.id})"></td>
            <td>${item.tarea}</td>
            <td>${item.fechaCreacion.toLocaleString()}</td>
            <td>${item.fechaRealizacion.toLocaleString()}</td>
            <td><img width="10%" class="borrar" src="images/TachoBorrar.png" onclick="borrar(${item.id})"></td>
        </tr>`;
        // document.getElementById('tableBody').innerHTML += row;
        document.getElementById('tableBody').insertAdjacentHTML('beforeend', row);//Usando esto en lugar de la línea de arriba, se puede lograr marcar como resuelta cualquier tarea
        chequearItem(item.id-1);
    });
}

const anadirEstiloResuelto = (id) =>{
    let retorno;
    if (items[id].realizado)
    {
        retorno = "resuelto";
    }
    else retorno = "";
    return retorno;
}
const chequearItem = (id) =>{
    if (items[id].realizado)
    {
        document.getElementById('check' + items[id].id).checked = true;
    }
}

const obtenerId = (id) => id++;


const tacharItem = (id) =>{
    items[id-1].fechaRealizacion = calcularRealizacion(id-1);
    refrescarPagina();
}

const calcularRealizacion = (id) =>{
    let yaFueRealizado = items[id].realizado;
    let fechaRealizado;
    if (!yaFueRealizado)
    {
        fechaRealizado = new Date()
        items[id].realizado = true;
    }
    else
    {
        fechaRealizado = "N/A";
        items[id].realizado = false;
    }
    return fechaRealizado;
}

const borrar = (itemB) => {
    let indice = items.map(item => item.id).indexOf(itemB);
    items.splice(indice, 1);
    for(let i = indice; i <items.length; i++){
        items[i].id--;
    }
    refrescarPagina();
}

const borrarTodo = () => {
    items = [];
    textoTarea.innerHTML = "";
    refrescarPagina();
}

const obtenerRapidezTarea = () =>{
    
    let tareaRapida = {
        tarea: null,
        calculo: Infinity
    };
    let encontrado = false, id = 0, date1, date2;
    while(!encontrado && id < items.length - 1){
        if (items[id].fechaRealizacion != "N/A")
        {
            encontrado = true;
            date1 = new Date(items[id].fechaRealizacion);
            date2 = new Date(items[id].fechaCreacion);
            tareaRapida.calculo = date1.getTime() - date2.getTime();
            tareaRapida.tarea = items[id].tarea;
        }
        else id++;
    }

    items.map(item =>{
        if (item.fechaRealizacion != "N/A")
        {
            
            if ((item.fechaRealizacion.getTime()-item.fechaCreacion.getTime()) < tareaRapida.calculo)
            {
                tareaRapida.tarea = item.tarea;
                tareaRapida.calculo = item.fechaRealizacion.getTime() - item.fechaCreacion.getTime();
            }
        }
    });
    textoTarea.innerHTML= "La tarea más rápida en realizarse fue " + tareaRapida.tarea + ", que tardó " + (tareaRapida.calculo)/1000 + " segundos";
    return tareaRapida;
}

const verificarTarea = () =>{
    let tarea = document.getElementById("descripcion").value;
    let dev = document.getElementById("devInput");
    tarea=tarea.trim();
    dev.style.color = "red";
    if (tarea.length==0){
        dev.innerHTML = `<p>La tarea no puede estar vacía</p>`;
    }
    else{
        dev.innerHTML = ``;
    }
}