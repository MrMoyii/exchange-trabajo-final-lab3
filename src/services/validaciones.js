export default function validarStringAlfaNum(str) {
  // Expresión regular que verifica si el string contiene al menos una letra y al menos un número
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

  // Verificar si el string cumple con la expresión regular
  if (regex.test(str)) {
    return true; // El string cumple con la validación
  } else {
    return false; // El string no cumple con la validación
  }
}
