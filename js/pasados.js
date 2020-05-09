//Define las variables que necesites
let eventos
let hoy
let pasados = []

$(document).ready(function () {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({ url: './info.json' }).done((respuesta) => {
    //Guarda el resultado en variables
    eventos = respuesta.eventos
    hoy = respuesta.fechaActual

    //Selecciona los eventos que sean anteriores a la fecha actual del JSON
    pasados = eventos.filter((x) => {
      return x.fecha < hoy
    })

    //Ordena los eventos segun la fecha (los mas recientes primero)
    pasados = pasados.sort((a, b) => {
      if (a.fecha < b.fecha) {
        return 1
      }
      return -1
    })

    //Crea un string que contenga el HTML que describe el detalle del evento
    let htmlPasado = ''

    //Recorre el arreglo y concatena el HTML para cada evento
    for (let i = 0; i < pasados.length; i++) {
      htmlPasado += `
                    <div class="card mb-4" style="width: 90%;">
                      <div class="card-body">
                        <h2 class="mb-0"><a href='./detalle.html?id=${pasados[i].id}'>${pasados[i].nombre}</a></h2>
                        <p class="text-muted mb-2">${pasados[i].fecha} - ${pasados[i].lugar}</p> 
                        <p class="text-dark mb-0">${pasados[i].descripcion}</p>
                        <p class="text-info mb-0">Invitados: ${pasados[i].invitados}</p>
                      </div>
                    </div>
                    `
    }

    //Modifica el DOM agregando el html generado
    document.getElementById('pasados').innerHTML = htmlPasado
  })
})
