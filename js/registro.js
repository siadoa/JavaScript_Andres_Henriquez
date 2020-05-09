// Hemos omitido los acentos en los comentarios por compatibilidad
function limpiarErrores() {
  var errores = document.getElementsByClassName('text-danger')
  for (var i = 0; i < errores.length; i++) {
    errores[i].innerHTML = ''
  }
}

function validar(formulario) {
  limpiarErrores()
  //Expresion regular del correo
  let emailValidacion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (formulario.nombres.value.trim().length < 3) {
    document.getElementById('errornombres').innerText = 'Este campo es obligatorio'
    formulario.nombres.value = ''
    formulario.nombres.focus()
    return false
  } else if (!emailValidacion.test(formulario.email.value.trim())) {
    document.getElementById('errorEmail').innerText = 'Formato de correo invalido'
    formulario.email.value = ''
    formulario.email.focus()
    return false
  } else if (formulario.contrasena.value.trim().length < 7) {
    document.getElementById('errorContrasena').innerText = 'Debe tener al menos 7 caracteres'
    formulario.contrasena.value = ''
    formulario.confirmacion.value = ''
    formulario.contrasena.focus()
    return false
  } else if (formulario.confirmacion.value.trim() !== formulario.contrasena.value.trim()) {
    document.getElementById('errorConfirmacion').innerText = 'No coincide con contraseña'
    formulario.contrasena.value = ''
    formulario.confirmacion.value = ''
    formulario.contrasena.focus()
    return false
  } else if (formulario.tipo.value === '-1') {
    document.getElementById('errorTipo').innerText = 'Este campo es obligatorio'
    return false
  } else if (!formulario.acepto.checked) {
    document.getElementById('errorAcepto').innerText = 'Este campo es obligatorio'
    return false
  }

  document.getElementById('errorAcepto').innerText = ''
  alert('(!Datos enviados exitosamente!')
  return true
}
