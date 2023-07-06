import fetch from "node-fetch";

const appKey = "fake app key";

async function getArrivals(stopCode) {
  const arrivalsResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals?app_key=${appKey}`);
  const arrivalPredictions = await arrivalsResponse.json();

  return arrivalPredictions;
}

async function busBoard() {
  const stopCode = "490008660N";

  const arrivals = await getArrivals(stopCode);

  for (let i = 0; i < arrivals.length; i++) {
    const prediction = arrivals[i];

    console.log(`Bus ${prediction.lineName} arriving in ${prediction.timeToStation} seconds`);
  }
}

busBoard();
