const { autoExporter } = require("@devlander/collect-exports-for-bundle")

const options = {
    directory: "src",
    defaultExportFile: "update-package-json-type.ts",
    saveEntryFileWithExtension: ".ts",
    includeExtensions: [".ts"],
    "excludeExtensions": [".test.ts", ".d.ts", "config.ts"],
   

    excludeFolders: ["dist", 'node_modules', "typings"],
}


const main = () => {
    autoExporter(options)
}

main()