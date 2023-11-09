const autoExporter = require('@devlander/collect-exports-for-bundle').default

const main = () => {
  autoExporter({
    rootDir: 'src',
    primaryExportFile: 'update-package-json-type.ts',
    allowedExtensions: ['.ts'],
    exportMode: 'default',
    ignoredExtensions: ['.spec.ts', '.config.ts'],
    outputFilenameExtension: '.ts'
  })
}

main()
