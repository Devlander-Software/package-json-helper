const { autoExporter } = require('@devlander/collect-exports-for-bundle')

const main = () => {
  autoExporter({
    rootDir: 'src',
    primaryExportFile: 'update-package-json-type.ts',
    allowedExtensions: ['.ts'],
    ignoredExtensions: ['.spec.ts', '.config.ts'],
    outputFilenameExtension: '.ts'
  })
}

main()
