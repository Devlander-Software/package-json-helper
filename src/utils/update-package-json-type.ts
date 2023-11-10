import * as fs from 'fs'
import { PackageJson } from '../types/package-json.interface'
import { UpdatePackageJsonTypeInterface } from '../types/update-package-json-type.interface'
import { getCurrentBranch } from './get-current-git-branch'
import { isDeepEqual } from './is-deep-equal'
import { logColoredMessage, logMessageBasedOnCondition } from './log-with-color'

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
  specifiedBranch?: string
) => {
  const packageJsonPath = './package.json'
  try {
    const packageJson: Partial<PackageJson> = JSON.parse(
      fs.readFileSync(packageJsonPath, 'utf8')
    )
    const newPackageJson = { ...packageJson }

    const currentBranch: string = specifiedBranch || getCurrentBranch()

    if (removeTypeFlag && !specifiedBranch && newPackageJson.type) {
      delete newPackageJson.type
      logColoredMessage(`Attempting to remove type from package.json`, 'blue')
    } else if (
      ((typeFlag && newPackageJson.type !== typeFlag) ||
        !newPackageJson.type) &&
      !specifiedBranch
    ) {
      if (!newPackageJson.type) {
        logColoredMessage(
          `Trying to set package.json type to  ${typeFlag}`,
          'blue'
        )
      } else {
        logColoredMessage(
          `Attempting to replace type ${newPackageJson.type} with ${typeFlag} in package.json`,
          'blue'
        )
      }

      newPackageJson.type = typeFlag
    } else if (specifiedBranch && removeTypeOnBranchFlag) {
      logColoredMessage(
        `Attempting to remove type from package.json since specifiedBranch and removeTypeOnBranchFlag have been set`,
        'blue'
      )
      if (currentBranch && currentBranch === specifiedBranch) {
        logColoredMessage(
          'Removing type from package.json since specified branch matches current branch',
          'blue'
        )
        delete newPackageJson.type
      } else {
        logColoredMessage(
          `Not removing type from package.json since  ${currentBranch} does not match ${specifiedBranch}`,
          'blue'
        )
      }
    }

    if (!isDeepEqual(packageJson, newPackageJson)) {
      fs.writeFileSync(packageJsonPath, JSON.stringify(newPackageJson, null, 2))
      logMessageBasedOnCondition('package.json updated successfully.', true)
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
