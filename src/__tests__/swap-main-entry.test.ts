import { isJson } from '@devlander/utils'
import type { PackageJson } from '../types/package-json.interface'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

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

  // write reset to package.json
  const updateValueAndReturnJson = (value: string) => {
    const oldValue = refetchJson(pathForExamplePackageJson).main
    swapMainEntry(value, pathForExamplePackageJson)
    const updatedPackageJson = refetchJson(pathForExamplePackageJson)
    return { updatedPackageJson, oldValue }
  }

  // reset the package.json to the original value

  // now get the example package.json using the current command path

  const pathForExamplePackageJson = `${currentCommand}/example/package.json`

  beforeAll(() => {
    swapMainEntry('index.js', pathForExamplePackageJson)
  })

  it('should be able to swap the main entry in package.json', () => {
    const testValue = updateValueAndReturnJson('new-value')
    expect(testValue.updatedPackageJson.main).toBe('new-value')
    expect(testValue.updatedPackageJson.main).not.toBe(testValue.oldValue)
    expect(testValue.updatedPackageJson.main).not.toBe('new-value-two')
  }, 500)

  it('should be able to swap the main entry back to the original value', () => {
    const testValue = updateValueAndReturnJson('new-value-two')
    wait(100)
    expect(testValue.updatedPackageJson.main).toBe('new-value-two')
    wait(100)

    expect(testValue.updatedPackageJson.main).not.toBe(testValue.oldValue)
    wait(100)

    expect(testValue.updatedPackageJson.main).not.toBe('new-value')
    expect(testValue.updatedPackageJson.main).not.toBe('index.js')
  }, 500)
})
