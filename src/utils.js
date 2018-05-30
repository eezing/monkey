'use strict';

const path = require('path');

module.exports = {
  resolveFilePath,
  isObject
};

function resolveFilePath(filePath) {
  return path.resolve(process.cwd(), filePath);
}

function isObject(target) {
  return (
    typeof target === 'object' &&
    Array.isArray(target) === false &&
    target !== null
  );
}
