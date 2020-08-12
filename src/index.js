import commander from "./commander";

const func = () => {
  const { file: filePath } = commander();
  console.log(`Got file path`, filePath);
};

export default func;
