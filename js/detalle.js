// Hemos omitido los acentos en los comentarios por compatibilidad
let eventos
let evento

$(document).ready(function () {
  //Carga los datos que estan en el JSON (info.json) usando AJAX
  $.ajax({ url: './info.json' }).done((respuesta) => {
    //Guarda el resultado en una variable
    eventos = respuesta.eventos

    //obteniendo el id del url
    let id = location.search.match(/id=(\d)*/)[1]

    //Busca el elemento en el arreglo
    evento = eventos.find((x) => {
      return x.id == id
    })

    //Crea un string que contenga el HTML que describe el detalle del evento
    let html = `
                <div class="card" style="width: 90%;">
                  <div class="card-body">
                    <h2 class="mb-0">${evento.nombre}</h2>
                    <p class="text-muted mb-2">${evento.fecha} - ${evento.lugar}</p> 
                    <p class="text-dark mb-0">${evento.descripcion}</p>
                    <p class="text-info mb-0">Invitados: ${evento.invitados}</p>
                    <p class="text-warning mb-0">Costo: $${evento.precio}.00</p>
                  </div>
                </div>
              `

    //Modifica el DOM agregando el html generado dentro del div con id=evento
    document.getElementById('evento').innerHTML = html
  })
})
