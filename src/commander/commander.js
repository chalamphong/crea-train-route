import readline from "readline";
import { stdin, stdout } from "process";
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

    if (flagVarName !== null) {
      processedArgs[flagVarName] = true;
      flagVarName = null;
    }
  }

  return processedArgs;
};

const askAQuestion = (promptInterface, question) =>
  new Promise(resolve => {
    promptInterface.question(`${question}: `, answer => {
      resolve(answer);
    });
  });

/**
 * Prompts cli to asks for more information from the user
 * @param {Array} questions       Questions to ask the user
 */
const ask = async questions => {
  const promptInterface = readline.createInterface({
    input: stdin,
    output: stdout
  });

  const responses = {};

  if (Array.isArray(questions) && questions.length > 0) {
    for (let i = 0; i < questions.length; i++) {
      const { key, label } = questions[i];
      /* eslint-disable no-await-in-loop */
      const response = await askAQuestion(promptInterface, label);
      /* eslint-enable no-await-in-loop */

      responses[key] = response;
    }

    promptInterface.close();
  }

  return responses;
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

export { processArgs, ask };

export default commander;
