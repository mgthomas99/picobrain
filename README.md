[github-index-url]: https://github.com/mgthomas99/picofuck/blob/master/index.js
[github-license-url]: https://github.com/mgthomas99/picofuck/blob/master/LICENSE
[github-repository-url]: https://github.com/mgthomas99/picofuck
[github-license-shield-url]: https://img.shields.io/github/license/mgthomas99/picofuck.svg?style=flat-square
[github-size-shield-url]: https://img.shields.io/github/size/mgthomas99/picofuck/index.js.svg?style=flat-square
[npm-package-url]: https://www.npmjs.com/package/picofuck
[npm-downloads-shield-url]: https://img.shields.io/npm/dt/picofuck.svg?style=flat-square
[npm-version-shield-url]: https://img.shields.io/npm/v/picofuck.svg?style=flat-square

# picofuck

[![npm][npm-version-shield-url]][npm-package-url]
[![npm][npm-downloads-shield-url]][npm-package-url]
[![Github file size][github-size-shield-url]][github-index-url]
[![GitHub][github-license-shield-url]][github-license-url]

> Perhaps the smallest Javascript brainfuck interpreter

`picofuck` is a tiny Javascript brainfuck interpreter.

## Usage

```js
var bf = require("picofuck")

bf("+++[>++++++++++<-]>+++."); // Returns "!"
```

## Why

Why not?

This library is also an open [codegolf](https://en.wikipedia.org/wiki/Code_golf)
challenge. Please feel free to submit pull requests if you're able to make the
code even shorter!

## Install, Build & Test

To install the package, use the standard NPM install command:

```sh
npm install picofuck
```

The package is hand-written, minified Javascript; therefore, no build process is
required, and you can directly edit and execute the source!

An NPM script has been created for simplicity when running tests, which can be
run from the command line as shown below:

```sh
npm test
```

picofuck uses the [Tape](https://www.npmjs.com/package/tape) library for
testing.

### Content Delivery Network (CDN)

The picofuck library can be imported via [unpkg](https://unpkg.com/) as shown
below:

```html
<script type="application/javascript">var module={};</script>
<script src="https://unpkg.com/picofuck/index.js"></script>
<script type="application/javascript">
  var bf = module.exports;
  // Library is imported as `bf`!
</script>
```

Be aware that picofuck is a CommonJS module and therefore uses
`module.exports`; before importing the script, you will need to define `module`
or use a CommonJS-compatible module loader.

## License

Please see the `LICENSE` file for license information.
