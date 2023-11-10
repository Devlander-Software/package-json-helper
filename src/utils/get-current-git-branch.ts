import { execSync } from 'child_process'

/**
 * Get the current Git branch name.
 * @returns The current branch name.
 */
export function getCurrentBranch(): string {
  try {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf8'
    })
    if (branchName && typeof branchName !== 'undefined') {
      return branchName.trim()
    } else {
      return 'unknown'
    }
  } catch (err) {
    console.error('Error getting current branch:', err)
    return 'unknown'
  }
}
