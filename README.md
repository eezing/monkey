# monkey

Command line text file templating using JavaScript placeholders. It's [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) without the (``).

## Get Started

### Build

1.  Install Node.js version 8.x.x or later
2.  Install pkg for bulding the binary: `npm install -g pkg`
3.  Run build command: `npm run build`
4.  Copy binary to user bin (mac osx): `cp build/bin-macos /usr/local/bin/monkey`

### Usage

1.  Create Files

    **context.yaml**

    ```yaml
    foo: world
    ```

    **template.txt**

    ```txt
    hello ${foo}!
    ```

2.  Run executable

    ```bash
    $ monkey -c context.yaml -t template.txt -o result.txt
    ```

3.  --> result.txt

    ```txt
    hello world!
    ```

---

## Arguments

| Long       | Short | Description                              |
| ---------- | ----- | ---------------------------------------- |
| --context  | -c    | Path to _.yaml_ or _.json_ or _.js_ file |
| --template | -t    | Path to any utf8 file                    |
| --outfile  | -o    | Path of outfile                          |

### Context as JSON or YAML

If your context file is .yaml or .json, it must resolve to a valid JavaScript object.

Good

```json
{
  "foo": "world"
}
```

Bad

```json
[
  {
    "foo": "world"
  }
]
```

### Context as JavaScript

A context file can also be a Node.js compatible .js. Must resolve to an object.

context.js

```js
module.exports = {
  foo: () => 'world'
};
```

template.txt

```txt
hello ${foo()}
```

command

```bash
$ monkey -c context.js -t template.txt  -o result.txt
```

result.txt

```txt
hello world
```

### Multiple context arguments

Pass 1 or more context argments. Each context will get [assigned](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) to the last.

contextA.yaml

```yaml
foo: world
```

contextB.json

```json
{
  "bar": "turtles"
}
```

contextC.js

```js
module.exports = {
  baz: () => 'radical'
};
```

template.txt

```txt
hello ${foo}
I like ${bar}
I am ${baz}
```

command

```bash
$ monkey \\
    -c contextA.yaml \\
    -c contextB.json \\
    -c contextC.js   \\
    -t template.txt  \\
    -o result.txt
```

result.txt

```
hello world
I like turtles
I am radical
```
