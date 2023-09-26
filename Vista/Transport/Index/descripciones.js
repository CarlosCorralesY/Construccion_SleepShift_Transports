
var conductores = ["Juan Carlos Corrales Nunez", "Carlos Daniel Corrales Yarasca", "Gonzalo Eduardo Corrales Yarasca", "Pedro Humberto Rondon Ponce"];

var ciudadesViajes = ["Arequipa", "Puno", "Lima", "Camaná", "Moquegua", "Ilo", "Pocsi", "Tacna"];

var unidadesBuses = ["Bus Escania", "Bus Volvo", "Bus Modasa", "Bus Volare"];

var costosViajes = {
    "Arequipa": "S/.100",
    "Puno": "S/.120",
    "Lima": "S/.90",
    "Camaná": "S/.150",
    "Moquegua": "S/.130",
    "Ilo": "S/.140",
    "Pocsi": "S/.110",
    "Tacna": "S/.160"
};

// Función para mostrar la información de los conductores
function mostrarConductores() {
 
    var contenidoDebajoSubMenu = document.getElementById('contenido-debajo-submenu');
    contenidoDebajoSubMenu.innerHTML = '';
    var conductoresInfo = document.getElementById('conductores-info');
    conductoresInfo.style.display = 'none';

    var viajesInfo = document.getElementById('viajes-info');
    viajesInfo.style.display = 'none';

    var unidadesInfo = document.getElementById('unidades-info');
    unidadesInfo.style.display = 'none';


    var costosInfo = document.getElementById('costos-info');
    costosInfo.style.display = 'none';

    var conductoresInfo = document.getElementById('conductores-info');
    conductoresInfo.style.display = 'block';

    var conductoresLista = conductoresInfo.querySelector('ul');
    conductoresLista.innerHTML = '';


    for (var i = 0; i < conductores.length; i++) {
        var conductorItem = document.createElement('li');
        conductorItem.textContent = conductores[i];
        conductoresLista.appendChild(conductorItem);
    }
}

// Función para mostrar las ciudades de Viajes
function mostrarCiudadesViajes() {
  
    var contenidoDebajoSubMenu = document.getElementById('contenido-debajo-submenu');
    contenidoDebajoSubMenu.innerHTML = '';

    var conductoresInfo = document.getElementById('conductores-info');
    conductoresInfo.style.display = 'none';

    var viajesInfo = document.getElementById('viajes-info');
    viajesInfo.style.display = 'none';

    var costosInfo = document.getElementById('costos-info');
    costosInfo.style.display = 'none';

    var unidadesInfo = document.getElementById('unidades-info');
    unidadesInfo.style.display = 'none';
 
    var viajesInfo = document.getElementById('viajes-info');
    viajesInfo.style.display = 'block';

    var viajesLista = viajesInfo.querySelector('ul');
    viajesLista.innerHTML = '';

    for (var i = 0; i < ciudadesViajes.length; i++) {
        var ciudadItem = document.createElement('li');
        ciudadItem.textContent = ciudadesViajes[i];
        viajesLista.appendChild(ciudadItem);
    }
}

// Función para mostrar los costos
function mostrarCostos() {

    var conductoresInfo = document.getElementById('conductores-info');
    conductoresInfo.style.display = 'none';

    var viajesInfo = document.getElementById('viajes-info');
    viajesInfo.style.display = 'none';

    var costosInfo = document.getElementById('costos-info');
    costosInfo.style.display = 'none';

    var costosInfo = document.getElementById('costos-info');
    costosInfo.style.display = 'block';
    
    var unidadesInfo = document.getElementById('unidades-info');
    unidadesInfo.style.display = 'none';

    var costosLista = costosInfo.querySelector('ul');
    costosLista.innerHTML = '';

    for (var ciudad in costosViajes) {
        var costoItem = document.createElement('li');
        costoItem.textContent = ciudad + ": " + costosViajes[ciudad];
        costosLista.appendChild(costoItem);
    }
}

// Función para limpiar el contenido debajo del submenú
function limpiarContenido() {
    var conductoresInfo = document.getElementById('conductores-info');
    conductoresInfo.style.display = 'none';

    var viajesInfo = document.getElementById('viajes-info');
    viajesInfo.style.display = 'none';

    var costosInfo = document.getElementById('costos-info');
    costosInfo.style.display = 'none';

    var unidadesInfo = document.getElementById('unidades-info');
    unidadesInfo.style.display = 'none';

    var contenidoDebajoSubMenu = document.getElementById('contenido-debajo-submenu');
    contenidoDebajoSubMenu.innerHTML = '';
    
}

// Función para mostrar la informacion de los buses de asignacion
function mostrarUnidadesBuses() {
    var contenidoDebajoSubMenu = document.getElementById('contenido-debajo-submenu');
    contenidoDebajoSubMenu.innerHTML = '';

    var conductoresInfo = document.getElementById('conductores-info');
    conductoresInfo.style.display = 'none';

    var viajesInfo = document.getElementById('viajes-info');
    viajesInfo.style.display = 'none';

    var costosInfo = document.getElementById('costos-info');
    costosInfo.style.display = 'none';

    var unidadesInfo = document.getElementById('unidades-info');
    unidadesInfo.style.display = 'block';

    var unidadesLista = unidadesInfo.querySelector('ul');
    unidadesLista.innerHTML = '';

    for (var i = 0; i < unidadesBuses.length; i++) {
        var unidadItem = document.createElement('li');
        unidadItem.textContent = unidadesBuses[i];
        unidadesLista.appendChild(unidadItem);
    }
}

// Función para redirigir al usuario al login
function redirigirAlLogin() {
    window.location.href = "../Login/Login.html";
}

document.getElementById('conductores-link').addEventListener('click', mostrarConductores);
document.getElementById('viajes-link').addEventListener('click', mostrarCiudadesViajes);
document.getElementById('costos-link').addEventListener('click', mostrarCostos);
document.getElementById('limpiar-link').addEventListener('click', limpiarContenido);
document.getElementById('unidades-link').addEventListener('click', mostrarUnidadesBuses);
document.getElementById('salir-link').addEventListener('click', redirigirAlLogin);