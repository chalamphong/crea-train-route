/**
 * Returns a processed version of arguments passed on by node's process.argv.
 * Returns an object where all flags are converted to an object.
 * Example:
 *  for args = ["--arg1=foo", "--arg2", "bar"], the return will be
 *  {
 *    arg1: "foo",
 *    arg2: "bar",
 * }
 *
 * @param {Array} args        Array of arguments. Expected to be an array of string
 */
const processArgs = args => {
  const processedArgs = {};
  if (Array.isArray(args) && args.length > 0) {
    let flagVarName = null;
    args.forEach(arg => {
      if (arg.startsWith("--")) {
        if (flagVarName !== null) {
          processedArgs[flagVarName] = true;
          flagVarName = null;
        }

        const formattedArg = arg.replace("--", "");
        const formattedArgChunks = formattedArg.split("=");
        if (formattedArgChunks.length > 1) {
          processedArgs[formattedArgChunks[0]] = formattedArgChunks[1];
        } else {
          flagVarName = formattedArgChunks[0];
        }
      } else if (flagVarName !== null) {
        processedArgs[flagVarName] = arg;
        flagVarName = null;
      }
    });
  }

  return processedArgs;
};

/**
 * Commander is a cli command tool to command arguments from the user of the cli tool
 * @param {Object} params
 * @param {Array?} params.flags          Flags in the arguments that user has interests in
 *                                       Optional. If null, commander assumes user is interested
 *                                       in all flags. If passed and the flag is missing, commander
 *                                       will prompt the user to provide it
 */
const commander = () => {
  const [, , ...args] = process.argv;

  const processedArgs = processArgs(args);

  return processedArgs;
};

export { processArgs };

export default commander;
