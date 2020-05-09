// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
let eventos
let hoy
let proximos = []
let pasados = []

$(document).ready(function () {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({ url: '../info.json' }).done((respuesta) => {
    //Guarda el resultado en variables
    eventos = respuesta.eventos
    hoy = respuesta.fechaActual

    //Clasifica los eventos segun la fecha actual del JSON
    proximos = eventos.filter((x) => {
      return x.fecha > hoy
    })

    pasados = eventos.filter((x) => {
      return x.fecha < hoy
    })

    //Ordena los eventos segun la fecha (los mas cercanos primero) - Proximos eventos
    proximos = proximos.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return -1
      }
      return 1
      // return a.fecha - b.fecha
    })

    pasados = pasados.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return 1
      }
      return -1
      // return b.fecha - a.fecha
    })

    //Extrae solo dos eventos
    let mostrarProximos = [proximos[0], proximos[1]]
    let mostrarPasados = [pasados[0], pasados[1]]

    //Crea un string que contenga el HTML que describe el detalle del evento
    let htmlProximo = ''
    let htmlPasado = ''

    //Recorre el arreglo y concatena el HTML para cada evento
    for (let i = 0; i < mostrarProximos.length; i++) {
      htmlProximo += `
                    <div class="card col-md col-sm-12 m-3">
                      <div class="card-body">
                        <h2 class="mb-0"><a href='./detalle.html?id=${mostrarProximos[i].id}'>${mostrarProximos[i].nombre}</a></h2>
                        <p class="text-muted mb-2">${mostrarProximos[i].fecha}</p>
                        <p class="text-dark mb-0">${mostrarProximos[i].descripcion}</p>
                      </div>
                    </div>
                    `
    }

    for (let j = 0; j < mostrarPasados.length; j++) {
      htmlPasado += `
                    <div class="card col-md col-sm-12 m-3">
                      <div class="card-body">
                        <h2 class="mb-0"><a href='./detalle.html?id=${mostrarPasados[j].id}'>${mostrarPasados[j].nombre}</a></h2>
                        <p class="text-muted mb-2">${mostrarPasados[j].fecha}</p>
                        <p class="text-dark mb-0">${mostrarPasados[j].descripcion}</p>
                      </div>
                    </div>
                    `
    }

    //Modifica el DOM agregando el html generado
    document.getElementById('proximos').innerHTML = htmlProximo
    document.getElementById('pasados').innerHTML = htmlPasado
  })
})
