#!/usr/bin/env node

import yargs from 'yargs'
import updatePackageJsonType from '../utils/update-package-json-type'

// Your other existing functions can be added here if necessary

export function cli() {
  // CLI configuration using yargs
  yargs
    .scriptName('update-pkg')
    .usage('$0 <cmd> [args]')
    .command(
      'update-type',
      'Update the type in package.json',
      {
        type: {
          type: 'string',
          alias: 't',
          describe: 'Set the type value in package.json'
        },
        removeType: {
          type: 'boolean',
          alias: 'r',
          describe: 'Remove the type property from package.json'
        },
        removeTypeOnBranch: {
          type: 'boolean',
          alias: 'b',
          describe:
            'Remove the type property on a specific branch from package.json'
        },
        specifiedBranch: {
          type: 'string',
          alias: 's',
          describe: 'The specific branch to apply the removeTypeOnBranch flag'
        }
      },
      (argv) => {
        updatePackageJsonType(
          argv.type,
          argv.removeType,
          argv.removeTypeOnBranch,
          argv.specifiedBranch
        )
      }
    )
    .help().argv
}

cli()
