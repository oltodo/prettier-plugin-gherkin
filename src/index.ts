import type { Plugin } from "prettier";
import type AstNode from "@cucumber/gherkin/dist/src/AstNode";
import printer from "./printer";
import parser from "./parser";

const plugin: Plugin<AstNode> = {
  languages: [
    {
      name: "Gherkin",
      parsers: ["gherkin"],
      extensions: [".feature"],
      vscodeLanguageIds: ["feature"],
      linguistLanguageId: 76,
    },
  ],
  printers: {
    gherkin: printer,
  },
  parsers: {
    gherkin: parser,
  },
};

export default plugin;
