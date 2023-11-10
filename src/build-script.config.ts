const startExport = () => {
  require('@devlander/collect-exports-for-bundle').default({
    rootDir: 'src',
    primaryExportFile: 'update-package-json-type.ts',
    allowedExtensions: ['.ts'],
    exportMode: 'both',
    ignoredExtensions: ['.spec.ts', '.config.ts'],
    outputFilenameExtension: '.ts'
  })
}

startExport()
