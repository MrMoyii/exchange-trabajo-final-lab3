export default function () {
  const fechaActual = new Date();
  // Obtener componentes de la fecha y hora actual
  var dia = fechaActual.getDate();
  // obtengo el mes actual (0-11, donde 0 es enero y 11 es diciembre)
  var mes = fechaActual.getMonth() + 1;
  var año = fechaActual.getFullYear();
  var horas = fechaActual.getHours();
  var minutos = fechaActual.getMinutes();
  // Dar el formato de fecha y hora de la compra
  return `${mes}/${dia}/${año} ${horas}:${minutos}`;
}
