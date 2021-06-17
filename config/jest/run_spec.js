"use strict";

const { readdirSync, lstatSync, readFileSync } = require("fs");
const { extname } = require("path");
const { format } = require("prettier");

Error.stackTraceLimit = Infinity;

const { AST_COMPARE } = process.env;

function run_spec(dirname, parsers, options) {
  options = Object.assign(
    {
      plugins: ["src/index.ts"]
    },
    options
  );

  /* instabul ignore if */
  if (!parsers || !parsers.length) {
    throw new Error(`No parsers were specified for ${dirname}`);
  }

  readdirSync(dirname).forEach((filename) => {
    const path = `${dirname}/${filename}`;
    if (
      extname(filename) !== ".snap" &&
      lstatSync(path).isFile() &&
      filename[0] !== "." &&
      filename !== "jsfmt.spec.js"
    ) {
      let source = read(path);

      if (!options.keepEOL) {
        source = source.replace(/\r\n/g, "\n");
      }

      const mergedOptions = Object.assign(mergeDefaultOptions(options || {}), {
        parser: parsers[0]
      });
      const output = prettyprint(source, path, mergedOptions);
      test(`${filename} - ${mergedOptions.parser}-verify`, () => {
        expect(raw(output)).toMatchSnapshot(filename);
      });

      parsers.slice(1).forEach((parser) => {
        const verifyOptions = Object.assign(mergedOptions, { parser });
        test(`${filename} - ${parser}-verify`, () => {
          const verifyOutput = prettyprint(source, path, verifyOptions);
          expect(output).toEqual(verifyOutput);
        });
      });
    }
  });
}

global.run_spec = run_spec;

function prettyprint(src, filename, options) {
  return format(
    src,
    Object.assign(
      {
        filepath: filename
      },
      options
    )
  );
}

function read(filename) {
  return readFileSync(filename, "utf8");
}

/**
 * Wraps a string in a marker object that is used by `./raw-serializer.js` to
 * directly print that string in a snapshot without escaping all double quotes.
 * Backticks will still be escaped.
 */
function raw(string) {
  if (typeof string !== "string") {
    throw new Error("Raw snapshots have to be strings.");
  }
  return { [Symbol.for("raw")]: string };
}

function mergeDefaultOptions(parserConfig) {
  return Object.assign(
    {
      printWidth: 80
    },
    parserConfig
  );
}
