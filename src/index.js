import path from "path";
import fs from "fs";

import commander from "./commander";
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

  blab.info(`Routes received ${JSON.stringify(routes, null, 2)}`);
};

export default func;
