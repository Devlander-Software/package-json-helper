export interface UpdatePackageJsonTypeInterface {
  (
    typeFlag: PackageJsonModuleType,
    removeTypeFlag: boolean,
    removeTypeOnBranchFlag?: boolean,
    specifiedBranch?: string
  ): void
}

export type PackageJsonModuleType = 'module' | 'commonjs' | string
