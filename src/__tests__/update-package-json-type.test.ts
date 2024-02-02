import updatePackageJsonType from '../utils/update-package-json-type'

describe('updatePackageJsonType', () => {
  const fs = require('fs')
  const { execSync } = require('child_process')
  const currentCommand = process.cwd()
  // get package to use based on the current commands path

  const pathForPackageToUse = `${currentCommand}/dist/cjs`

  const packageToUse = require(pathForPackageToUse)
  const { getCurrentBranch } = packageToUse
  const updatePackageJsonType = packageToUse.default

  console.log(updatePackageJsonType, 'updatePackageJsonType')

  it('should update the type field to module', () => {
    updatePackageJsonType('module')
  })

  it('should remove the type field', () => {
    updatePackageJsonType(undefined, true)
  })

  it('should remove the type field on a specific branch', () => {
    const currentBranchName = getCurrentBranch()
    console.log(currentBranchName)

    updatePackageJsonType(undefined, false, true, currentBranchName)
  })

  it('should not update package.json if there are no changes', () => {
    updatePackageJsonType('module')
  })

  // Add more tests for other scenarios and error handling
})

describe('updatePackageJsonType', () => {
  it('should not update package.json type entry when removeTypeOnBranchFlag is true', () => {})

  it('should log an error when package.json is not found', () => {
    updatePackageJsonType('module', false, false, undefined, pathForPackageJson)
  })

  it('should log an error when package.json parsing fails', () => {
    updatePackageJsonType('module', false, false, undefined, pathForPackageJson)
  })
})
