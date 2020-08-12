import path from "path";
import fs from "fs";

import commander, { ask } from "./commander";
import blab from "./blab";
import routesParser from "./routesparser";

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

  blab.info(`Starting csv file parsing`, typeof fileData);
  let routes = {};
  try {
    routes = routesParser.parse(fileData);
  } catch (e) {
    blab.error(`😭 Error parsing csv file ${e.message}`);
    return;
  }

  blab.info(`Routes parsing complete`, routes);

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
    const { to, from } = answers;
    blab.info(`Looking for the shortest route from ${from} to ${to}`);
  });
};

export default func;
