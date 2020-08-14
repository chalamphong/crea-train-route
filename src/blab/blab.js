const blab = {
  infoColorCode: "\x1b[36m",
  warnColorCode: "\x1b[33m",
  errorColorCode: "\x1b[31m",
  successColorCode: "\x1b[32m",
  resetCode: "\x1b[0m",
  nextLine: () => {
    console.log("");
  },
  info: text => {
    console.log(`${blab.infoColorCode}${text}${blab.resetCode}`);
    blab.nextLine();
  },
  warn: text => {
    console.log(`${blab.warnColorCode}${text}${blab.resetCode}`);
    blab.nextLine();
  },
  success: text => {
    console.log(`${blab.successColorCode}${text}${blab.resetCode}`);
    blab.nextLine();
  },
  error: (text, e) => {
    console.log(`${blab.errorColorCode}${text}${blab.resetCode}`);
    if (e) {
      console.log(`${blab.errorColorCode}${text}${blab.resetCode}`);
    }

    blab.nextLine();
  },
  log: text => {
    console.log(text);
    blab.nextLine();
  }
};

export default blab;
