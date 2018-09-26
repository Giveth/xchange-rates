function getPriceApiAsync({ left, right, timestamp }) {
  // Now this api supports the pair as direct and inverse
  const url =
    "https://min-api.cryptocompare.com/data/dayAvg?fsym=" +
    left +
    "&tsym=" +
    right +
    "&toTs=" +
    timestamp +
    "&extraParams=giveth";
  return fetch(url)
    .then(response => response.json())
    .then(responseJson => {
      // Deal with errors
      if (responseJson.Response && responseJson.Response === "Error") {
        if (responseJson.Message && responseJson.Message.includes("invalid")) {
          // Trade pair ETH/ETH is invalid
          return { price: 1 };
        } else {
          return { price: "Error" };
        }
      }

      // Provide feedback on the type of conversion
      // Direct, indirect, through other pairs, etc...
      let type = "";
      if (responseJson.ConversionType) {
        if (responseJson.ConversionType.type)
          type += responseJson.ConversionType.type + " ";
        if (responseJson.ConversionType.conversionSymbol)
          type += "through " + responseJson.ConversionType.conversionSymbol;
      }

      return {
        price: responseJson[right],
        type
      };
    })
    .catch(error => {
      console.error(error);
    });
}

export default async function({ left, right, timestamp }) {
  // Now this api supports the pair as direct and inverse
  // No need to keep track of the market if it's inverse or direct
  let res = (await getPriceApiAsync({ left, right, timestamp })) || {};
  console.log(
    "Fetched rate: " +
      res.price +
      " " +
      right +
      "/" +
      left +
      ", type: " +
      res.type +
      " - timestamp:",
    timestamp
  );
  return res.price;
}
