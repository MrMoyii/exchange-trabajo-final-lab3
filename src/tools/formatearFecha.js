const moment = require("moment");
export default function (fechaISO) {
  // Crea un objeto moment con la fecha en formato ISO8601 y establece que está en formato UTC
  const fechaMoment = moment.utc(fechaISO);

  // Formatea la fecha en el formato deseado (DD/MM/YYYY HH:mm)
  const fechaFormateada = fechaMoment.format("DD/MM/YYYY HH:mm");

  return fechaFormateada;
}
