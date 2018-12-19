import rollupPluginFlow from "rollup-plugin-flow";
import flowEntry from "rollup-plugin-flow-entry";
import packageJson from "./package.json";

export default [
  {
    input: "src/index.js",
    output: [
      { file: packageJson.main, format: "cjs", sourcemap: true },
      { file: packageJson.module, format: "es", sourcemap: true }
    ],
    plugins: [flowEntry(), rollupPluginFlow()]
  }
];
