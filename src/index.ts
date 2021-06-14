import type { Plugin } from "prettier";
import printer from "./printer";
import parser from "./parser";

const plugin: Plugin = {
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
