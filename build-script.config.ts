import { AutoExporterOptions, autoExporter } from "@devlander/collect-exports-for-bundle"

const options: AutoExporterOptions = {
    directory: "./",
    defaultExportFile: "update-package-json-type.ts",
    // includeExtensions: [".ts"],
    "excludeExtensions": [".test.ts", ".d.ts", "config.ts"],
    files: [
        "types.ts",
     
    ],
    excludeFolders: ["dist", 'node_modules', "typings"],
}


const main = () => {
    autoExporter(options)
}

main()