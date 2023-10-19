"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collect_exports_for_bundle_1 = require("@devlander/collect-exports-for-bundle");
const options = {
    directory: "./",
    defaultExportFile: "update-package-json-type.ts",
    // includeExtensions: [".ts"],
    "excludeExtensions": [".test.ts", ".d.ts", "config.ts"],
    files: [
        "types.ts",
    ],
    excludeFolders: ["dist", 'node_modules', "typings"],
};
const main = () => {
    (0, collect_exports_for_bundle_1.autoExporter)(options);
};
main();
//# sourceMappingURL=build-script.config.js.map