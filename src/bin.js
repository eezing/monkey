#!/usr/bin/env

'use strict';

const minimist = require('minimist');
const { resolveFilePath } = require('./utils');
const fs = require('fs');
const { loadAndCompile } = require('./index');

const argv = minimist(process.argv.slice(2));

const args = {
  template: argv.t || argv.template,
  context: argv.c || argv.context,
  outfile: argv.o || argv.outfile
};

['template', 'context', 'outfile'].forEach(k => {
  const arg = args[k];

  if (arg === undefined) {
    console.error(`Error: missing arg "${k}"`); //eslint-disable-line
    process.exit(1);
  }

  console.log(`${k}: ${arg}`); //eslint-disable-line
});

const result = loadAndCompile(args.template, args.context);

fs.writeFileSync(resolveFilePath(args.outfile), result, 'utf8');
