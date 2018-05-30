'use strict';

const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const { resolveFilePath } = require('./utils');

const loaderByExt = {
  '.js': asModule,
  '.json': asModule,
  '.yaml': asYaml
};

/**
 * Loads file at given path as JS.
 * @param {string} filePath Path of file to load.
 * @returns {object} File content loaded as JS object or array.
 */
function loadContext(filePath) {
  const parsed = path.parse(filePath);
  const loader = loaderByExt[parsed.ext];

  if (loader === undefined)
    throw new Error(`loader not found for file ext: ${parsed.ext}`);

  return loader(filePath);
}

// loaders

function asModule(filePath) {
  return require(resolveFilePath(filePath));
}

function asYaml(filePath) {
  return yaml.safeLoad(fs.readFileSync(resolveFilePath(filePath), 'utf8'));
}

module.exports = loadContext;
