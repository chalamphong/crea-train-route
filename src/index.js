import path from "path";
import fs from "fs";

import commander, { ask } from "./commander";
import blab from "./blab";
import routesParser from "./routesparser";
import ShunMaps from "./shunmaps";

const readFile = filePath => {
  try {
    const relativeFilePath = path.resolve("./", filePath);
    blab.info(`🤓 Reading routes file from ${relativeFilePath}`);
    const fileData = fs.readFileSync(relativeFilePath);
    return fileData;
  } catch (e) {
    throw e;
  }
};

const func = () => {
  blab.nextLine();
  const { file: filePath } = commander();
  let fileData;
  try {
    fileData = readFile(filePath);
  } catch (e) {
    blab.error(`😭 Got error reading file: ${e.message}`);
    return;
  }

  let routes = {};
  let shunMaps;
  try {
    routes = routesParser.parse(fileData);
    shunMaps = new ShunMaps({ routes });
  } catch (e) {
    blab.error(`😭 Error parsing csv file ${e.message}`);
    return;
  }

  const questions = [
    {
      key: "from",
      label: "What station are you getting on to the train?"
    },
    {
      key: "to",
      label: "What station are you getting off the train?"
    }
  ];

  ask(questions).then(answers => {
    blab.nextLine();
    const { to, from } = answers;
    blab.info(`Looking for the shortest route from ${from} to ${to}`);

    const shortestRoute = shunMaps.getShortestRoute({ from, to });

    if (shortestRoute) {
      const { stops, duration } = shortestRoute;
      blab.success(
        `🚂 Your trip from ${from} to ${to} includes ${stops} ${
          stops > 1 ? "stops" : "stop"
        } and will take ${duration} ${duration > 1 ? "minutes" : "minute"}`
      );
    } else {
      blab.error(`😢 There are no routes from ${from} to ${to}. Not happening`);
    }
  });
};

export default func;
