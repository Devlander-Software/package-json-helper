"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentBranch = exports.updatePackageJsonType = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
/**
 * Update the 'type' property in the package.json file based on provided flags and conditions.
 * @name updatePackageJsonType
 * @param {string} typeFlag - The value to set for the 'type' property.
 * @param {boolean} removeTypeFlag - Whether to remove the 'type' property.
 * @param {boolean} removeTypeOnBranchFlag - Whether to remove the 'type' property on a specific branch.
 * @param {string} specifiedBranch - The specified branch on which to remove the 'type' property.
 */
const updatePackageJsonType = (typeFlag, removeTypeFlag, removeTypeOnBranchFlag, specifiedBranch) => {
    // Read package.json
    const packageJsonPath = './package.json';
    try {
        const packageJson = JSON.parse(fs_1.default.readFileSync(packageJsonPath, 'utf8'));
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
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('package.json updated successfully.');
    }
    catch (err) {
        console.error('Error updating package.json:', err);
    }
};
exports.updatePackageJsonType = updatePackageJsonType;
/**
 * Get the current Git branch name.
 * @returns {string} The current branch name.
 */
function getCurrentBranch() {
    try {
        return (0, child_process_1.execSync)('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    }
    catch (err) {
        console.error('Error getting current branch:', err);
        return 'unknown';
    }
}
exports.getCurrentBranch = getCurrentBranch;
// Example usage:
// Replace 'true' or 'false' with actual flag values, and provide the specifiedBranch as needed.
// updatePackageJsonType('--type esm', true, false, 'main');
exports.default = exports.updatePackageJsonType;
//# sourceMappingURL=update-package-json-type.js.map