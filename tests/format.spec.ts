import fs from "fs";
import path from "path";
import prettier from "prettier";
import type { ParserOptions } from "prettier";

import plugin from "../src/index";

const fixture = fs.readFileSync(
  path.join(__dirname, "./fixture.feature"),
  "utf-8"
);

function format(content: string, opts: Partial<ParserOptions> = {}) {
  return prettier.format(content, {
    ...opts,
    parser: "gherkin",
    plugins: [plugin],
  });
}

test("defaults", () => {
  const formatted = format(fixture);
  expect(formatted).toMatchSnapshot();
});
