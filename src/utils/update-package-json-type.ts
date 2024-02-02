import * as fs from 'fs'
import type { PackageJson } from '../types/package-json.interface'
import type { UpdatePackageJsonTypeInterface } from '../types/update-package-json-type.interface'
import { getCurrentBranch } from './get-current-git-branch'
import { logColoredMessage, logMessageBasedOnCondition } from './log-with-color'
import { isDeepEqual, isJson } from '@devlander/utils'
import { swapTypeEntry } from './swap-type-entry'
import { removeTypeOnValidBranch } from './remove-type-on-branch'
import pico from 'picocolors'

/**
 * Update the 'type' property in the package.json file based on provided flags and conditions.
 * @param typeFlag - The value to set for the 'type' property.
 * @param removeTypeFlag - Whether to remove the 'type' property.
 * @param removeTypeOnBranchFlag - Whether to remove the 'type' property on a specific branch.
 * @param specifiedBranch - The specified branch on which to remove the 'type' property.
 */
const updatePackageJsonType: UpdatePackageJsonTypeInterface = (
  typeFlag: string = 'commonjs',
  removeTypeFlag?: boolean,
  removeTypeOnBranchFlag?: boolean,
  specifiedBranch?: string,
  pathForPackageJson?: string
) => {
  let packageJsonPath = ''
  const typeToCheck = typeFlag
  if (!pathForPackageJson) {
    pathForPackageJson = `${process.cwd()}/package.json`
  } else {
    packageJsonPath = pathForPackageJson
  }

  const getPackage = (pathForPackageJson: string): PackageJson => {
    if (!fs.existsSync(pathForPackageJson)) {
      throw new Error('package.json not found')
    }
    const jsonToRead = fs.readFileSync(pathForPackageJson, 'utf8')
    const parsedJson = isJson(jsonToRead)
    if (!parsedJson) {
      throw new Error('failed to parse json')
    } else {
      return parsedJson as unknown as PackageJson
    }
  }

  try {
    const packageJson = getPackage(pathForPackageJson)
    if (!packageJson) {
      throw new Error('package.json not found')
    }
    let newPackageJson: PackageJson = { ...packageJson }

    const onSpecifiedBranch = removeTypeOnValidBranch(
      newPackageJson,
      specifiedBranch
    )
    if (!onSpecifiedBranch) {
      const result = swapTypeEntry(typeToCheck, packageJsonPath)
      if (typeof result !== 'string' && typeof result === 'object') {
        newPackageJson = result
      }
    }

    if (!isDeepEqual(packageJson, newPackageJson)) {
      logMessageBasedOnCondition('package.json updated successfully.', true)

      pico.bgWhite(`${pico.blue('Changes made to')}
        ${pico.bgBlue(pico.white('package.json:'))}
        ${pico.magenta('before:')}
        ${pico.green(JSON.stringify(packageJson, null, 2))}
        ${pico.magenta('after:')}
        ${pico.green(JSON.stringify(newPackageJson, null, 2))}
        ${pico.black('When passing arguments:')}
        ${pico.bgBlack(pico.white(`typeFlag: ${typeFlag}`))}
        ${pico.bgBlack(pico.white(`removeTypeFlag: ${removeTypeFlag}`))}
        ${pico.bgBlack(
          pico.white(`removeTypeOnBranchFlag: ${removeTypeOnBranchFlag}`)
        )}
        ${pico.bgBlack(pico.white(`specifiedBranch: ${specifiedBranch}`))}
      `)
    } else {
      logColoredMessage(
        `No need to update package.json as 'type' is already set to ${typeFlag}.`,
        'blue'
      )
    }
  } catch (err) {
    logMessageBasedOnCondition('Error updating package.json', false)
    console.error('Error updating package.json:', err)
  }
}

export default updatePackageJsonType
