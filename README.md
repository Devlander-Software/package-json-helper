# Package.json Type Helper

## Introduction

This utility package is designed to streamline the development process of design systems within the context of Storybook and React. It addresses a common issue where having a **`type`** property defined in your **`package.json`** can disrupt the development and deployment flow.
When developing design systems with **Storybook and React**, you may encounter scenarios where you want to test components or features within Storybook itself. Additionally, you might need to publish your design system as an npm module using tools like Rollup and **`npm publish`**. However, if your `package.json` includes a `type` property, it can lead to problems when rendering components within Storybook.
It is intended to be used within npm scripts, or github actions. 

## This package simplifies the process by providing a command-line utility that allows you to manage the `type` property in your `package.json` file based on specific conditions. It enables you to:

- Remove the **`type`** property entirely.
- Remove the **`type`** property only when on a specified branch.
- Set a custom **`type`** value if needed.
- Default to a **`type`** of `'commonjs'` if it's missing.

## Installation

You can install the **`package-json-type-helper`** package globally using npm:

npm
```bash
npm install gist:d420341155c670038a6c9062f823434d
```

or

yarn
```bash
yarn add gist:d420341155c670038a6c9062f823434d
```

## Usage
Once installed, you can use the **package-json-type-helper** command in your terminal. Here are some examples of how to use it:

## Remove the type property from package.json:

```bash
  @devlander/package-json-type-helper --removeType
```

## Remove the type property from package.json only when on a specified branch (e.g., 'main'):
```bash
  package-json-type-helper --removeTypeOnBranch --branch main
```

Set a custom type value in package.json (e.g., 'esm'):
```bash
  @devlander/package-json-type-helper --type module
```

Default to a type of 'commonjs' in package.json if it doesn't exist:
```bash
  @devlander/package-json-type-helper
```

## Notes
Ensure that you are running this utility from the root directory of your project where the package.json file is located.
Always commit your changes to package.json after using this utility to maintain consistency in your version control system.
By using the package-json-type-helper, you can conveniently manage the type property in your package.json without causing issues when developing and deploying your design system in Storybook and npm.

License
This package is open-source and released under the MIT License. See the LICENSE file for details.