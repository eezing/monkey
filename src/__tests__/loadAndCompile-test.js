const TEMPLATE_FILE_PATH = './src/__tests__/loadAndCompile-deps/template.txt';
const EXPECTED_FILE_PATH = './src/__tests__/loadAndCompile-deps/expected.txt';

const { loadAndCompile } = require('../index');
const fs = require('fs');

describe('context as .yaml file', () => {
  const CONTEXT_FILE_PATH = './src/__tests__/loadAndCompile-deps/context.yaml';
  const expected = fs.readFileSync(EXPECTED_FILE_PATH, 'utf8');

  test(`expect .yaml to be ${expected}`, () => {
    const result = loadAndCompile(TEMPLATE_FILE_PATH, CONTEXT_FILE_PATH);
    expect(result).toBe(expected);
  });
});

describe('context as .js file', () => {
  const CONTEXT_FILE_PATH = './src/__tests__/loadAndCompile-deps/context.js';
  const expected = fs.readFileSync(EXPECTED_FILE_PATH, 'utf8');

  test(`expect .js to be ${expected}`, () => {
    const result = loadAndCompile(TEMPLATE_FILE_PATH, CONTEXT_FILE_PATH);
    expect(result).toBe(expected);
  });
});

describe('context as .json file', () => {
  const CONTEXT_FILE_PATH = './src/__tests__/loadAndCompile-deps/context.json';
  const expected = fs.readFileSync(EXPECTED_FILE_PATH, 'utf8');

  test(`expect .json to be ${expected}`, () => {
    const result = loadAndCompile(TEMPLATE_FILE_PATH, CONTEXT_FILE_PATH);
    expect(result).toBe(expected);
  });
});

describe('multiple context files', () => {
  describe('2 context paths as .yaml', () => {
    const CONTEXT_PATHS = [
      './src/__tests__/loadAndCompile-deps/multi-context-1.yaml',
      './src/__tests__/loadAndCompile-deps/multi-context-2.yaml'
    ];

    const expected = fs.readFileSync(EXPECTED_FILE_PATH, 'utf8');

    test(`expect .yaml to be ${expected}`, () => {
      const result = loadAndCompile(TEMPLATE_FILE_PATH, CONTEXT_PATHS);
      expect(result).toBe(expected);
    });
  });
});

describe('context as with array as body (unsupported body in context)', () => {
  const CONTEXT_FILE_PATH =
    './src/__tests__/loadAndCompile-deps/context-as-array.yaml';
  const expectedErrorName = 'context_not_object';

  test(`expect thrown error.name to be ${expectedErrorName}`, () => {
    try {
      loadAndCompile(TEMPLATE_FILE_PATH, CONTEXT_FILE_PATH);
    } catch (err) {
      expect(err.name).toBe(expectedErrorName);
    }
  });
});

describe('context as .none (unsupported file ext)', () => {
  const CONTEXT_FILE_PATH = './src/__tests__/loadAndCompile-deps/context.none';

  test(`expect .none to throw`, () => {
    expect(() =>
      loadAndCompile(TEMPLATE_FILE_PATH, CONTEXT_FILE_PATH)
    ).toThrow();
  });
});
