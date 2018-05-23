const url = 'https://api.coinmarketcap.com/v2/ticker/'

function getCmApiAsync(callback) {
  return fetch(url)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        const coinArray = []
        for (const coin of Object.values(res.data)) {
          coinArray.push({
            rank: coin.rank,
            name: coin.symbol
          })
        }
        callback(coinArray)
      } else {
        throw Error('error retrieving CM data from: ',url)
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

getCmApiAsync((res) => {
  console.log('CM',res)
})
