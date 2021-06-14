import {
  Parser as GherkinParser,
  AstBuilder,
  GherkinClassicTokenMatcher,
} from "@cucumber/gherkin";
import { IdGenerator } from "@cucumber/messages";
import type { Parser } from "prettier";

const parser: Parser = {
  astFormat: "gherkin",
  parse(text) {
    const uuidFn = IdGenerator.uuid();
    const builder = new AstBuilder(uuidFn);
    const matcher = new GherkinClassicTokenMatcher(); // or GherkinInMarkdownTokenMatcher()

    const parser = new GherkinParser(builder, matcher);

    return parser.parse(text);
  },
  locStart() {
    return 0;
  },
  locEnd() {
    return 0;
  },
};

export default parser;
