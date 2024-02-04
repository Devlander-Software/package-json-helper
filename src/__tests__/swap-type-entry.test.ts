import { isJson } from '@devlander/utils'
import type { PackageJson } from '../types/package-json.interface'

describe('swapTypeEntry', () => {
  const fs = require('fs')
  const currentCommand = process.cwd()
  // get package to use based on the current commands path

  const pathForPackageToUse = `${currentCommand}/dist/cjs`

  const packageToUse = require(pathForPackageToUse)
  const { swapTypeEntry } = packageToUse
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
  const pathForExamplePackageJson = `${currentCommand}/example/package.json`

  it('should update type entry to "commonjs" when typeToSwap is "commonjs"', () => {
    return new Promise<void>((done) => {
      swapTypeEntry('commonjs', pathForExamplePackageJson)

      setTimeout(() => {
        const updatedPackageJson = refetchJson(pathForExamplePackageJson)
        expect(updatedPackageJson.type).toBe('commonjs')
        return done()
      }, 1000)
    })
  }, 1500)

  it('should remove type entry when typeToSwap is "none"', () => {
    return new Promise<void>((done) => {
      swapTypeEntry('none', pathForExamplePackageJson)

      setTimeout(() => {
        const updatedPackageJson = refetchJson(pathForExamplePackageJson)
        expect(updatedPackageJson.type).toBeUndefined()
        done()
      }, 500)
    })
  })
})
