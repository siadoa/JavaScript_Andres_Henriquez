// Hemos omitido los acentos en los comentarios por compatibilidad

//Define las variables que necesites
let eventos
let hoy
let proximos = []

$(document).ready(function () {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({ url: './info.json' }).done((respuesta) => {
    //Guarda el resultado en variables
    eventos = respuesta.eventos
    hoy = respuesta.fechaActual

    //Selecciona los eventos que sean posteriores a la fecha actual del JSON
    proximos = eventos.filter((x) => {
      return x.fecha > hoy
    })

    //Ordena los eventos segun la fecha (los mas cercanos primero)
    proximos = proximos.sort((a, b) => {
      if (a.fecha > b.fecha) {
        return 1
      }
      return -1
      // return a.fecha - b.fecha
    })

    //Crea un string que contenga el HTML que describe el detalle del evento
    let htmlProximo = ''

    //Recorre el arreglo y concatena el HTML para cada evento
    for (let i = 0; i < proximos.length; i++) {
      htmlProximo += `
                    <div class="card mb-4" style="width: 90%;">
                      <div class="card-body">
                        <h2 class="mb-0"><a href='./detalle.html?id=${proximos[i].id}'>${proximos[i].nombre}</a></h2>
                        <p class="text-muted mb-2">${proximos[i].fecha} - ${proximos[i].lugar}</p> 
                        <p class="text-dark mb-0">${proximos[i].descripcion}</p>
                        <p class="text-info mb-0">Costo: $${proximos[i].precio}.00</p>
                      </div>
                    </div>
                    `
    }

    //Modifica el DOM agregando el html generado dentro del div con id=evento
    document.getElementById('proximos').innerHTML = htmlProximo
  })
})
