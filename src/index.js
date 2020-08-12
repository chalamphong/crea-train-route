import commander from "./commander";

const func = () => {
  const args = commander();
  console.log(args);
};

export default func;
