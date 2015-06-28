# Discount ASCII Warehouse with ReactJS and Jest

This is a demo app, intended as a guide to writing simple apps using ReactJS, unit tested with Jasmine, and with Jest as the mocking tool.

## Requirements

This solution requires the following global dependencies to be installed:

* NodeJS v0.10.0 ([download](https://nodejs.org/dist/v0.10.0/))<br />(Unfortunately, it only works with this older version, due to Jest. This is an [open issue on GitHub](https://github.com/facebook/jest/issues/243).)
* Gulp (`npm install -g gulp`)
* Jest (`npm install -g jest-cli`)

If you have a later version of Node installed, you can still install v0.10 and run them both side-by-side. Simply install the [`n`](https://www.npmjs.com/package/n) package, and use it to install v0.10.0 and switch to v0.10.0. You can always install your newer version as well, and then switch between whichever versions you have installed.

## Installation

After installing the global dependencies, run the following:

`$ npm install`

And then run the solution (launches Grunt, which then spawns NodeJS to serve the files):

`$ npm start`

To run the Jasmine/Jest tests:

`$ npm test`


## License

Apache 2 Copyright &copy; 2015 Jonathan Conway
