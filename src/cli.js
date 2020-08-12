#!/usr/bin/env node
const meow = require("meow");
import func from "./index";

const cli = meow(`
Usage
  $ crea-train-route [input]

Options
  --foo  Lorem ipsum. [Default: false]

Examples
  $ crea-train-route
  unicorns
  $ crea-train-route rainbows
  unicorns & rainbows
`);

func(cli.input);
