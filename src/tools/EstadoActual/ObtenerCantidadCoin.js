export default function ObtenerCantidadCoin(coinArray) {
  let sumaCoin = 0;
  coinArray.forEach((e) => {
    sumaCoin += e.crypto_amount;
  });
  return sumaCoin;
}
