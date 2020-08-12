import commander from "./commander";
import blab from "./blab";

const func = () => {
  const { file: filePath } = commander();
  blab.info(`Got file path`, filePath);
};

export default func;
