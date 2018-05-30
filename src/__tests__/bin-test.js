const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CONTEXT_PATH = './src/__tests__/bin-deps/context.yaml';
const CONTEXT_MULTI_1_PATH = './src/__tests__/bin-deps/context-multi-1.yaml';
const CONTEXT_MULTI_2_PATH = './src/__tests__/bin-deps/context-multi-2.yaml';
const TEMPLATE_PATH = './src/__tests__/bin-deps/template.txt';
const EXPECTED_PATH = './src/__tests__/bin-deps/expected.txt';

test('Call bin with valid args', done => {
  const context = CONTEXT_PATH;
  const template = TEMPLATE_PATH;
  const output = `${tempFolder()}/output.txt`;

  callBin(context, template, output, () => {
    const result = fs.readFileSync(output, 'utf8');
    const expected = fs.readFileSync(EXPECTED_PATH, 'utf8');

    expect(result).toBe(expected);

    done();
  });
});

test('Call bin with multiple contexts', done => {
  const context1 = CONTEXT_MULTI_1_PATH;
  const context2 = CONTEXT_MULTI_2_PATH;
  const template = TEMPLATE_PATH;
  const output = `${tempFolder()}/output.txt`;

  callBin([context1, context2], template, output, () => {
    const result = fs.readFileSync(output, 'utf8');
    const expected = fs.readFileSync(EXPECTED_PATH, 'utf8');

    expect(result).toBe(expected);

    done();
  });
});

// helpers

function callBin(context, template, output, callback) {
  exec(
    `node src/bin.js ${makeContextArg(context)} -t ${template} -o ${output}`,
    (error, stdout, stderr) => {
      if (error) {
        throw new Error(`exec error: ${error}`);
      }
      callback({ stderr, stdout });
    }
  );
}

function makeContextArg(context) {
  return '-c ' + (Array.isArray(context) ? context.join(' -c ') : context);
}

function tempFolder() {
  const resultPath = fs.mkdtempSync(path.join(os.tmpdir(), 'bin-test-'));
  console.log(`Folder created at: ${resultPath}`); //eslint-disable-line
  return resultPath;
}
