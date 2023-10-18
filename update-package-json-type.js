const fs = require('fs');
const { execSync } = require('child_process');

/**
 * Update the 'type' property in the package.json file based on provided flags and conditions.
 * @function updatePackageJsonType
 * @param {string} typeFlag - The value to set for the 'type' property.
 * @param {boolean} removeTypeFlag - Whether to remove the 'type' property.
 * @param {boolean} removeTypeOnBranchFlag - Whether to remove the 'type' property on a specific branch.
 * @param {string} specifiedBranch - The specified branch on which to remove the 'type' property.
 */
function updatePackageJsonType(typeFlag, removeTypeFlag, removeTypeOnBranchFlag, specifiedBranch) {
  // Read package.json
  const packageJsonPath = './package.json';
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Get the current branch dynamically using Git if specifiedBranch is not provided
    const currentBranch = specifiedBranch || getCurrentBranch();

    // Check if --removeTypeFlag or --removeTypeOnBranchFlag is provided
    if (removeTypeFlag || (removeTypeOnBranchFlag && currentBranch === specifiedBranch)) {
      delete packageJson.type;
    }
    // Check if --typeFlag is provided and set the type accordingly
    else if (typeFlag) {
      packageJson.type = typeFlag;
    }
    // Set type to 'commonjs' by default if it doesn't exist
    else if (!packageJson.type) {
      packageJson.type = 'commonjs';
    }

    // Write the updated package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('package.json updated successfully.');
  } catch (err) {
    console.error('Error updating package.json:', err);
  }
}

/**
 * Get the current Git branch name.
 * @returns {string} The current branch name.
 */
function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (err) {
    console.error('Error getting current branch:', err);
    return 'unknown';
  }
}

// Example usage:
// Replace 'true' or 'false' with actual flag values, and provide the specifiedBranch as needed.
// updatePackageJsonType('--type esm', true, false, 'main');


module.exports = {
  updatePackageJsonType
}