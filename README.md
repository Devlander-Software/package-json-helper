
![Devlander Package Json Helper Header](https://github.com/Devlander-Software/package-json-type-helper/raw/main/media/images/package-json-type-helper-preview.jpg)



<a href="https://twitter.com/intent/tweet?button_hashtag=Devlander" target="\_parent">
  <img alt="#Devlander" src="https://img.shields.io/twitter/url?color=%2308a0e9&label=%23Devlander&style=social&url=https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Fbutton_hashtag%3DDevlander">
</a><a href="https://bit.ly/devlander-discord-invite" target="\_parent">
  <img alt="" src="https://img.shields.io/badge/Discord-Devlander-%235865F2" />
</a>

<a href="https://www.npmjs.com/package/@devlander/package-json-helper" target="\_parent">

  <img alt="" src="https://img.shields.io/npm/dm/@devlander/package-json-helper.svg" />
</a>

<a href="https://github.com/orgs/Devlander-Software/discussions">
  <img alt="Join the discussion on Github" src="https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue" />
</a>

<a href="https://bit.ly/3zg6mBG">
  <img alt="Join Devlander on Twitch" src="https://img.shields.io/twitch/status/twitch" />
</a>



<a href="https://bit.ly/landonwjohnson-on-twitter" target="\_parent">
  <img alt="Landon Johnson On Twitter" src="https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow" />
</a> 


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
npm install @devlander/package-json-helper
```

or

yarn
```bash
yarn add @devlander/package-json-helper
```

## Usage
Once installed, you can use the **package-json-type-helper** function to help you streamline your process. 

```javascript
const updatePackageJsonType = require("@devlander/package-json-type-helper")
// Capture command-line arguments

const updatePackage = () => {
  const args = process.argv.slice(2)

  // Define default flag values
  let typeFlag: string = "commonjs"
  let removeTypeFlag: boolean = false
  let removeTypeOnBranchFlag: boolean = false
  let specifiedBranch: string = "storybook"

  // Parse the command-line arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case "--type":
        typeFlag = args[++i]
        break
      case "--removeType":
        removeTypeFlag = true
        break
      case "--removeTypeOnBranch":
        removeTypeOnBranchFlag = true
        break
      case "--branch":
        specifiedBranch = args[++i]
        break
    }
  }
  updatePackageJsonType(
    typeFlag,
    removeTypeFlag,
    removeTypeOnBranchFlag,
    specifiedBranch,
  )
}

updatePackage()

```

I have been using it like this until i finish my cli


Inside your package.json scripts
```json
  "scripts": {
    "updatePackageType": "node ./package-type-helper.cjs",
    "setPackageTypeToCommonJs": "yarn run update-package-type -- --type commonjs",
    "removeTypeFromPackage": "yarn run update-package-type -- --removeType",
    "storybook": "yarn run removeTypeFromPackage && storybook build && storybook dev"
  }

```




## Notes
Ensure that you are running this utility from the root directory of your project where the package.json file is located.
By using the package-json-helper, you can conveniently manage the type property in your package.json without causing issues when developing and deploying your design system in Storybook and npm.

License
This package is open-source and released under the MIT License. See the LICENSE file for details.


## To Do
- [x] Create jest tests for update-package-json-type.ts
- [ ] Finalize cli tests
- [ ] Swap main entry files 
