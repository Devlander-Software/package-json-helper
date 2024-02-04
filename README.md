
# Package.json Type Helper: Streamline Your Design System Development

![Package Json Helper Header](https://github.com/Devlander-Software/package-json-type-helper/raw/main/media/images/package-json-type-helper-preview.jpg)

Promote your experience with Package.json Type Helper using our Twitter hashtag, connect on Discord, download from npm, engage in GitHub discussions, follow live updates on Twitch, and stay informed through Twitter and Wakatime stats.

- **Share on Twitter:** [![#Devlander](https://img.shields.io/twitter/url?color=%2308a0e9&label=%23Devlander&style=social&url=https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Fbutton_hashtag%3DDevlander)](https://twitter.com/intent/tweet?button_hashtag=Devlander)
- **Join Discord:** [![Discord](https://img.shields.io/badge/Discord-Devlander-%235865F2)](https://bit.ly/devlander-discord-invite)
- **npm Downloads:** [![npm](https://img.shields.io/npm/dm/@devlander/package-json-helper.svg)](https://www.npmjs.com/package/@devlander/package-json-helper)
- **GitHub Discussions:** [![GitHub](https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue)](https://github.com/orgs/Devlander-Software/discussions)
- **Watch on Twitch:** [![Twitch](https://img.shields.io/twitch/status/twitch)](https://bit.ly/3zg6mBG)
- **Follow on Twitter:** [![Twitter](https://img.shields.io/twitter/follow/landonwjohnson.svg?style=social&label=Follow)](https://bit.ly/landonwjohnson-on-twitter)
- **Wakatime Stats:** [![Wakatime](https://wakatime.com/badge/user/bd50b6c5-e0ca-4937-83b3-ab2d13adbc73/project/018bf414-eac6-416d-ad31-229b5e62bad3.svg)](https://bit.ly/landonwjohnson-on-twitter)

## Introduction

The Package.json Type Helper is a pivotal utility for developers working with design systems in Storybook and React. It simplifies managing the `type` property in the `package.json` file, facilitating seamless development and deployment processes. Ideal for Storybook and React projects, this tool is crucial for npm module releases and streamlines component rendering in Storybook, eliminating common obstacles and enhancing workflow efficiency.

## Key Features

- **Customizable `type` Property Management:** Effortlessly adjust the `type` property in `package.json` for optimized development and deployment.
- **Seamless Integration:** Compatible with npm scripts or GitHub Actions for straightforward implementation.
- **Expo Project Support:** Addresses path customization limitations for Expo projects, streamlining bundling and deployment.
- **Automated Process:** Automates type swapping and main entry file adjustments, minimizing manual intervention.

## Getting Started

### Installation

Install globally via npm or yarn:

```bash
npm install @devlander/package-json-helper
# or
yarn add @devlander/package-json-helper
```

### Usage

The command-line utility allows for flexible `package.json` type property management. Here's how to use it in your project:

```javascript
const updatePackageJsonType = require("@devlander/package-json-helper");

const updatePackage = () => {
  // Define your logic here for updating the package type
};

updatePackage();
```

Incorporate into your `package.json` scripts for streamlined usage:

```json
"scripts": {
  "storybook": "yarn run removeTypeFromPackage && storybook build && storybook dev"
}
```

## Important Notes

- **Root Directory Execution:** Ensure execution from your project's root directory for optimal performance.
- **License:** Open-source under the MIT License. See LICENSE for more details.

## Upcoming Features

- [x] Jest tests for utility functions.
- [x] Main entry file swapping.
- [ ] CLI tests finalization.
