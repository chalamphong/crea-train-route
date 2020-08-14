# crea-train-route [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> CLI tool to find the shortest route

## Intro

This is a cli package built using nodejs. It takes in a 
- csv file with route information,
- origin,
- destination for a trip 

and returns the shortest route possible, if it exists.

It's built as an npm package so in theory it can easily be published to npm, but it's not published. NPM does not need help with being noisy.

There is a publish workflow setup already so to publish we'd have to,

- Bump the package version, `npm version patch -m "Reasons"`
- Publish by running `npm publish`

More about package version [here](https://docs.npmjs.com/cli/version)

## Pre-requisites

This cli tool is built using node so you'll need to have node installed on your machine.

I would suggest using nvm to manage node versions. More on nvm [here](https://github.com/nvm-sh/nvm). There is a *.nvmrc* file in the root that specifies the node version for this tool. Just run `nvm use` before continue-*ing*.

## Installation

You'll need to install dependencies first. All dependencies are just dev dependencies used to help with the dev workflow and compilation. Dependency details can be found later in the doc. 

Generally you wouldn't need to do this but we'll be building this later on and dev dependencies are required to build.

To build run `npm build`. Transpiled code goes to the **lib** folder.

## Usage

After building you can run `node lib/cli.js --file="./relative/path/to/csv/file"`

The above command assumes you are running this from the root folder. If not, adjust the path for `lib/cli.js` accordingly.

### Running the unit test

Just run `yarn test`

### Unit test coverage report

Just run `yarn cov`

## Explanation

### Dependencies

We have a couple of dev dependencies.

- Babel to transpile ES6
- Prettier to format code based on some rules
- ESLint for linting
- Husky for managing git hooks
- lint-staged to lint-*ing* git staged files

The combination of Prettier, ESLint, Husky and lint-staged (PEHL) makes sure code consistency is fiercly adhered to. We all know how easy javascript makes the action of complicating code. 

*If the above combination (PEHL) was used to write this doc, the previous sentence would be much easier to understand.*

### Modules

There are a couple of modules each responsible for a small part of this module. Explanations below.

#### Blab

Blab is a logging util. It automatically adds color to the log based on the level. Also adds an extra line to make logs a bit more readable.

#### Commander

Commander is responsible for passing arguments from the interface to the script. It supports 2 mediums, 1 is arguments passed as flags and 2 is prompt.

#### RouteParser

Routeparser takes in a String or Buffer representing a Route CSV file content and converts to a usable route format.

#### ShumMaps

My name is Shun and this is my maps. It's the best *don't @ me*. It takes in route data and figures the shortest path from an origin to destination.

## License

MIT © [Chalamphong Pandey](chalamphong.com)


[npm-image]: https://badge.fury.io/js/crea-train-route.svg
[npm-url]: https://npmjs.org/package/crea-train-route
[travis-image]: https://travis-ci.com/chalamphong/crea-train-route.svg?branch=master
[travis-url]: https://travis-ci.com/chalamphong/crea-train-route
[daviddm-image]: https://david-dm.org/chalamphong/crea-train-route.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/chalamphong/crea-train-route
