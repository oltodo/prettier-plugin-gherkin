import type { Printer } from "prettier";
import type AstNode from "@cucumber/gherkin/dist/src/AstNode";

const printer: Printer<AstNode> = {
  print: () => "",
};

export default printer;
