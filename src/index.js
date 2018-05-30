'use strict';

const fs = require('fs');
const vm = require('vm');
const { resolveFilePath, isObject } = require('./utils');
const loadContext = require('./load-context');

function loadAndCompile(templateFilePath, contextFilePath) {
  const templateData = loadTemplate(templateFilePath);
  const contextData = getContextData(contextFilePath);
  return compile(templateData, contextData);
}

function getContextData(contextFilePath) {
  let context;

  if (Array.isArray(contextFilePath) === true) {
    context = contextFilePath.reduce(
      (out, next) => ({ ...out, ...loadContext(next) }),
      {}
    );
  } else {
    context = loadContext(contextFilePath);
  }

  if (isObject(context) === false) {
    const err = new Error(
      'Context file(s) must resolve to a JavaScript Object'
    );
    err.name = 'context_not_object';
    throw err;
  }

  return context;
}

function loadTemplate(filePath) {
  return fs.readFileSync(resolveFilePath(filePath), 'utf8');
}

function compile(template, context) {
  const script = new vm.Script('`' + template + '`');
  return script.runInNewContext(context);
}

module.exports = {
  loadAndCompile,
  loadTemplate,
  compile
};
