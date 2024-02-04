import { isJson } from '@devlander/utils'
import type { PackageJson } from '../types/package-json.interface'

describe('swapMainEntry', () => {
  const fs = require('fs')
  const currentCommand = process.cwd()
  // get package to use based on the current commands path

  const pathForPackageToUse = `${currentCommand}/dist/cjs`

  const packageToUse = require(pathForPackageToUse)
  const { swapMainEntry } = packageToUse

  const refetchJson = (pathForJson: string): PackageJson => {
    if (!fs.existsSync(pathForJson)) {
      return {
        version: '1.0.0',
        name: 'package',
        type: 'package.json not found'
      }
    }
    const jsonToRead = fs.readFileSync(pathForJson, 'utf8')
    const parsedJson = isJson(jsonToRead)
    if (!parsedJson) {
      return {
        version: '1.0.0',
        name: 'package',
        type: 'failed to parse json'
      }
    } else {
      return parsedJson as unknown as PackageJson
    }
  }

  // now get the example package.json using the current command path

  const pathForExamplePackageJson = `${currentCommand}/example/package.json`
  const originalValue = refetchJson(pathForExamplePackageJson).main

  it('should be able to swap the main entry in package.json', () => {
    return new Promise<void>((done) => {
      swapMainEntry('new-value', pathForExamplePackageJson)
      setTimeout(() => {
        const updatedPackageJson = refetchJson(pathForExamplePackageJson)
        expect(updatedPackageJson.main).toBe('new-value')
        expect(updatedPackageJson.main).not.toBe(originalValue)
        done()
      }, 1000)
    })
  }, 1500)

  it('should be able to swap the main entry back to the original value', () => {
    return new Promise<void>((done) => {
      swapMainEntry(originalValue, pathForExamplePackageJson)

      setTimeout(() => {
        const updatedValue = refetchJson(pathForExamplePackageJson).main
        expect(updatedValue).toBe(originalValue)
        expect(updatedValue).not.toBe('new-value')
        done()
      }, 1000)
    })
  }, 1500)
})
