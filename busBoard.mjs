import fetch from "node-fetch";

import winston from "winston";
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

async function getArrivals(stopCode) {
  const url = `https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`;
  const arrivalsResponse = await fetch(url);

  if (!arrivalsResponse.ok) {
    logger.error(`Fetch failed while getting arrivals for stop code ${stopCode}`);
    logger.error(`Returned with status ${arrivalsResponse.status} ${arrivalsResponse.statusText}`);
    logger.error(`URL used: ${`https://api.tfl.gov.uk/StopPoint/${stopCode}/Arrivals`}`);
    throw new Error(`Fetch failed while getting arrivals for stop code ${stopCode}`);
  }

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
