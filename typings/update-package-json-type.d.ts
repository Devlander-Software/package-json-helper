import { UpdatePackageJsonTypeInterface } from "./types";
/**
 * Update the 'type' property in the package.json file based on provided flags and conditions.
 * @name updatePackageJsonType
 * @param {string} typeFlag - The value to set for the 'type' property.
 * @param {boolean} removeTypeFlag - Whether to remove the 'type' property.
 * @param {boolean} removeTypeOnBranchFlag - Whether to remove the 'type' property on a specific branch.
 * @param {string} specifiedBranch - The specified branch on which to remove the 'type' property.
 */
declare const updatePackageJsonType: UpdatePackageJsonTypeInterface;
export default updatePackageJsonType;
