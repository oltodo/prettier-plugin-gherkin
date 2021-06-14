import type { Parser } from "prettier";

const parser: Parser = {
  astFormat: "gherkin",
  parse() {
    return {};
  },
  locStart() {
    return 0;
  },
  locEnd() {
    return 0;
  },
};

export default parser;
