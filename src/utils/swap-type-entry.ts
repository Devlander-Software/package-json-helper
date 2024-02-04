import fs from 'fs'
import { logColoredMessage } from './log-with-color'
import { isJson } from '@devlander/utils'
import type { PackageJson } from '../types/package-json.interface'

/**
 * Swaps the "type" entry in the package.json file with the specified value.
 * If no packageJsonPath is provided, it defaults to the current working directory.
 * @param typeToSwap The value to swap the "type" entry with. Can be "commonjs", "module", or "none". Defaults to "commonjs".
 * @param packageJsonPath The path to the package.json file. If not provided, it defaults to the current working directory.
 */
export const swapTypeEntry = (
  typeToSwap: 'commonjs' | 'module' | 'none' | undefined | string = 'commonjs',
  packageJsonPath?: string
): PackageJson | string => {
  try {
    if (
      typeToSwap !== 'commonjs' &&
      typeToSwap !== 'module' &&
      typeToSwap !== 'none' &&
      typeof typeToSwap !== 'undefined'
    ) {
      throw new Error(
        'Invalid typeToSwap value. Must be "commonjs", "module", or "none"'
      )
    }

    if (!packageJsonPath) {
      packageJsonPath = process.cwd() + '/package.json'
    }

    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found')
    }

    const packageJson = fs.readFileSync(packageJsonPath, 'utf8')
    let parsedPackage: PackageJson | boolean = isJson(packageJson) as
      | PackageJson
      | boolean

    if (typeof parsedPackage === 'boolean') {
      throw new Error('Invalid package.json format')
    }

    if (
      typeToSwap === 'none' ||
      (typeof typeToSwap === 'undefined' && parsedPackage.type)
    ) {
      delete parsedPackage.type
    } else if (parsedPackage.type !== typeToSwap) {
      parsedPackage.type = typeToSwap
    } else if (parsedPackage.type === typeToSwap) {
      console.log('Type is already set to the specified value')
      return parsedPackage as PackageJson
    } else if (!parsedPackage.type) {
      parsedPackage = {
        ...parsedPackage,
        type: typeToSwap
      }
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(parsedPackage, null, 2))

    logColoredMessage(
      `Updated type entry in package.json to ${typeToSwap}`,
      'blue'
    )

    return parsedPackage
  } catch (error: any) {
    logColoredMessage(`Failed to swap type entry: ${error.message}`, 'red')
    return 'Failed to swap type entry'
  }
}
