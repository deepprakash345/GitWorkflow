# Introduction

Client side runtime and tooling to build Adaptive Forms. This allows front end developers to create omni-channel adaptive form experiences.

Documentation site: https://git.corp.adobe.com/pages/livecycle/af2-web-runtime/story/

# Usage

Packages contained in this repository are published to the global npm registry.  Artifactory in the scope @adobe. 
The packages can be consumed as a dependency (i.e. added to the package.json of any project).

## Using Adaptive Form Super Component

To use adaptive form super component, add the following dependency,
```
npm i @adobe/aem-forms-af-core @adobe/aem-forms-af-react-components @adobe/react-spectrum @react/react-spectrum
```

## Using Form Builder Visual Studio Plugin

[Download](https://artifactory.corp.adobe.com/ui/api/v1/download?repoKey=generic-flamingo-network-data-snapshot-local&path=crispr/0.10.0/adaptive-form-builder-0.10.0.vsix)

## Versions

Node : 16.14.0 and v14.19.0 
NPM: v8.3.1 and v6.14.16 

The steps in this guide are tested against the above versions only. 
If your version is different then please try to upgrade or log an issue to see if that version can be supported.

# Try out the Playground

The playground is hosted on [git-pages](https://git.corp.adobe.com/pages/livecycle/af2-web-runtime/dist/) and uses the
headless demo instance. To run the playground locally execute the following commands

```
npx lerna bootstrap
npm run build
npm run start
```

# Development

## Getting Started

Our recommendation is to use [Node Version Manager](https://github.com/nvm-sh/nvm) so that you can manage multiple
installation of Node/NPM

### Clone the repository

Use `git clone` command to clone the repository. To run the storybook locally, you might need to initialize the 
git submodule that contains the examples used in the storybook. The commands to do that are
`git submodule init` && `git submodule update`

There are other ways to do that but for that you need to refer to the [git reference](https://git-scm.com/book/en/v2/Git-Tools-Submodules)

### Warning

**DO NOT RUN `npm install` AT THE ROOT OF THE REPOSITORY. IT DOESN'T GO WELL WITH LERNA. 
SEE [HERE](https://github.com/lerna/lerna/issues/2447#issuecomment-594589355)**

### Bootstrap

Once you have cloned this repository and installed the correct version of Node/NPM, run the following command at the
root directory of this project 

```
npx lerna bootstrap
```

We hoist all the packages at the root project.

## Build

```
npm run build
```

## Tests

```
npm run test
```

## Start the Playground

```
npm run start
```

## Start the Storybook

```
npm run story
```

# Contributing

Please raise an issue and a PR.