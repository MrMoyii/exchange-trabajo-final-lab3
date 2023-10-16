export default function obtenerMontoActual(historial, coinElegida) {
  //Agrupo por Coins
  let coinsObj = Object.groupBy(historial, (coin) => {
    return coin.crypto_code;
  });

  //array de Objects con la coin seleccionada
  let arrCoinSelect = coinsObj[coinElegida];

  // Variable para almacenar los valores de crypto_amount
  let monto = 0;
  if (arrCoinSelect == undefined) return monto;
  // Recorro el arreglo y sumo los valores si la action es 'purchase' o la resto si es 'sale'
  for (let i = 0; i < arrCoinSelect.length; i++) {
    if (arrCoinSelect[i].action === "purchase")
      monto += arrCoinSelect[i].crypto_amount;
    else if (arrCoinSelect[i].action === "sale")
      monto -= arrCoinSelect[i].crypto_amount;
    else console.log("Posible error al calcular el amount");
  }
  return monto;
}
