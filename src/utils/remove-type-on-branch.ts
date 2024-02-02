// if the current branch matches the specified branch, remove the type from package.json completely
// which would be used for things like storybook deployment

import type { PackageJson } from '../types/package-json.interface'
import { getCurrentBranch } from './get-current-git-branch'
import pico from 'picocolors'

// which would be used for things like storybook deployment
export const removeTypeOnValidBranch = (
  newPackageJson: PackageJson,
  specifiedBranch: string = 'storybook',
  currentBranch?: string
): boolean => {
  let typeRemoved = false
  let currentBranchName = ''

  if (!currentBranch) {
    currentBranchName = getCurrentBranch()
  }

  // Logging attempt with differentiated colors for readability
  console.log(
    `${pico.bgBlack('Attempting to remove type from')} ${pico.bgBlue(
      'package.json'
    )} ${pico.bgBlack('since')} ${pico.bgGreen(specifiedBranch)} ${pico.bgBlack(
      'and'
    )} ${pico.bgMagenta('removeTypeOnBranchFlag')} ${pico.bgBlack(
      'have been set'
    )}`
  )

  if (currentBranchName === specifiedBranch && newPackageJson.type) {
    delete newPackageJson.type
    typeRemoved = true
  }
  return typeRemoved
}
