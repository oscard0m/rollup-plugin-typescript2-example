import { rollup } from "rollup";
import typescript from "rollup-plugin-typescript2";
import ts from "typescript";

const nodeRemover = (context) => {
  return (sourceFile) => {
    const visitor = (node) => {
      // if (ts.isImportDeclaration(node) || ts.isVariableStatement(node)) {
      if (ts.isImportDeclaration(node)) {
        return undefined;
      }

      return ts.visitEachChild(node, visitor, context);
    };

    return ts.visitNode(sourceFile, visitor);
  };
};

const transformer = () => ({
  before: [nodeRemover],
  after: []
});

rollup({
  input: "./src/example.ts",
  plugins: [
    typescript({
      transformers: [transformer]
    })
  ]
}).then((bundle) => {
  bundle.write({
    file: "bundle.js"
  });
});
