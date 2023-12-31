import { Dependencies } from './dependencies.interface'
import { Person } from './person.interface'
import { Repository } from './repository.interface'
import { PackageJsonModuleType } from './update-package-json-type.interface'

export interface PackageJson {
  name: string
  version: string
  private?: boolean
  type?: PackageJsonModuleType
  description?: string
  keywords?: string[]
  homepage?: string
  license?: string
  author?: string | Person
  contributors?: Array<string | Person>
  files?: string[]
  main?: string
  browser?: string
  module?: string
  types?: string
  bin?: string | { [name: string]: string }
  man?: string | string[]
  directories?: {
    lib?: string
    bin?: string
    man?: string
    doc?: string
    example?: string
    test?: string
  }
  repository?: string | Repository
  scripts?: { [name: string]: string }
  config?: { [name: string]: string }
  dependencies?: Dependencies
  devDependencies?: Dependencies
  peerDependencies?: { [name: string]: string }
  bundledDependencies?: string[]
  optionalDependencies?: Dependencies
  engines?: { [type: string]: string }
  os?: string[]
  cpu?: string[]
  preferGlobal?: boolean
  publishConfig?: {
    registry?: string
    access?: 'public' | 'restricted'
    tag?: string
  }
  workspaces?: string[] | { packages: string[]; nohoist: string[] }
  resolutions?: { [name: string]: string }

  // Fields for various tools
  jest?: any
  eslintConfig?: any
  tsconfig?: any
  browserslist?: any
  husky?: any
  commitlint?: any
  lintStaged?: any
  stylelint?: any
  prettier?: any
  babel?: any
  [key: string]: any // For any additional fields.
}
