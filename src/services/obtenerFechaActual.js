export default function () {
  /* eslint-disable */
  var fechaActual = new Date();
  var dia = fechaActual.getDate();
  // obtengo el mes actual (0-11, donde 0 es enero y 11 es diciembre)
  var mes = fechaActual.getMonth() + 1; // Sumamos 1 para obtener el mes correcto
  var año = fechaActual.getFullYear();
  var hora = fechaActual.getHours();
  var minutos = fechaActual.getMinutes();

  return dia + '/' + mes + '/' + año + ' ' + hora + ':' + minutos;
} //ejemplo, "02/09/2023 15:30"