import rollupPluginFlow from "rollup-plugin-flow";
import flowEntry from "rollup-plugin-flow-entry";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.js",
        format: "cjs"
      }
    ],
    plugins: [flowEntry(), rollupPluginFlow()]
  }
];
