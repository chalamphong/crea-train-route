const blab = {
  nextLine: () => {
    console.log("");
  },
  info: text => {
    console.log(text);
    blab.nextLine();
  },
  warn: text => {
    console.warn(text);
    blab.nextLine();
  },
  error: (text, e) => {
    console.error(text);
    if (e) {
      console.error(e);
    }

    blab.nextLine();
  },
  log: text => {
    console.log(text);
    blab.nextLine();
  }
};

export default blab;
