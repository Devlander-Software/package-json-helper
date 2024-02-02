import type { Dependencies } from './dependencies.interface'
import type { Person } from './person.interface'
import type { Repository } from './repository.interface'
import type { PackageJsonModuleType } from './update-package-json-type.interface'

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
  jest?: JestConfig
  eslintConfig?: EslintConfig
  tsconfig?: TsconfigConfig
  browserslist?: BrowserslistConfig
  husky?: HuskyConfig
  commitlint?: CommitlintConfig
  lintStaged?: LintStagedConfig
  stylelint?: StylelintConfig
  prettier?: PrettierConfig
  babel?: BabelConfig
}

interface JestConfig {
  [key: string]: any
}

interface EslintConfig {
  [key: string]: any
}

interface TsconfigConfig {
  [key: string]: any
}

interface BrowserslistConfig {
  [key: string]: any
}

interface HuskyConfig {
  [key: string]: any
}

interface CommitlintConfig {
  [key: string]: any
}

interface LintStagedConfig {
  [key: string]: any
}

interface StylelintConfig {
  [key: string]: any
}

interface PrettierConfig {
  [key: string]: any
}

interface BabelConfig {
  [key: string]: any
}
