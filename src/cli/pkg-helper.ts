#!/usr/bin/env node

import { hideBin } from 'yargs/helpers'
import yargs from 'yargs/yargs'
import updatePackageJsonType from '../utils/update-package-json-type'

// Define the expected type for the parsed arguments
interface Arguments {
  type?: string
  removeType?: boolean
  removeTypeOnBranch?: boolean
  specifiedBranch?: string
  _: (string | number)[]
  $0: string
}

// Parse the command line arguments
const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <command> [options]')
  .option('type', {
    alias: 't',
    describe:
      'Set the "type" field in package.json. For example, use "--type module" to set the type to "module".',
    type: 'string'
  })
  .option('removeType', {
    alias: 'r',
    describe:
      'Remove the "type" field from package.json. This flag takes precedence over --type.',
    type: 'boolean'
  })
  .option('removeTypeOnBranch', {
    alias: 'b',
    describe:
      'Remove the "type" field from package.json, but only when on a specified Git branch. This requires --specifiedBranch to be set.',
    type: 'boolean'
  })
  .option('specifiedBranch', {
    alias: 's',
    describe:
      'Specify the Git branch for the --removeTypeOnBranch option. For example, use "--specifiedBranch main" to target the main branch.',
    type: 'string'
  })
  .help()
  .alias('help', 'h')
  .epilogue(
    'For more information, visit [your documentation URL or GitHub repo]'
  )
  .parseSync() // Use parseSync() to ensure a synchronous return type

const args: Arguments = argv as Arguments // Cast the argv to our Arguments interface

// Call the function with the parsed arguments
updatePackageJsonType(
  args.type ? args.type : undefined,
  args.removeType ? args.removeType : undefined,
  args.removeTypeOnBranch ? args.removeTypeOnBranch : undefined,
  args.specifiedBranch ? args.specifiedBranch : undefined
)
