import fs from 'fs'
import { logColoredMessage } from './log-with-color'

/**
 * Swaps the main entry in package.json.
 *
 * @param {string} packageJsonPath Path to the package.json file.
 * @param {string} newMainValue The new value for the main field.
 */
export const swapMainEntry = (
  packageJsonPath: string,
  newMainValue: string
) => {
  try {
    // Load package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    // Update the main field
    packageJson.main = newMainValue

    // Write the updated package.json back to file
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

    logColoredMessage(
      `Updated main entry in package.json to ${newMainValue}`,
      'blue'
    )
  } catch (error: any) {
    logColoredMessage('Failed to swap main entry', 'red')
  }
}
