#!/usr/bin/env node
'use strict';
const meow = require('meow');
const creaTrainRoute = require('./');

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
