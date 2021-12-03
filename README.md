# Introduction

Client side runtime for Headless Adaptive Form

# Usage

Packages contained in this repository are published to the 
[npm-aem-release](https://artifactory.corp.adobe.com/ui/#/artifacts/browse/simple/General/npm-aem-release) 
Artifactory in the scope @aemforms. 
The packages can be consumed as a dependency (i.e. added to the package.json of any project).

Simply add the following to your ~/.npmrc (or .npmrc):

```
@aemforms:registry=https://artifactory.corp.adobe.com:443/artifactory/api/npm/npm-aem-release/
//artifactory.corp.adobe.com:443/artifactory/api/npm/npm-adobe-release/:_auth=${NPM_TOKEN}
```

## Setup npm authentication

A user needs to be authenticated to access packages from the artifactory. 
Follow the steps mentioned in the 
[wiki](https://wiki.corp.adobe.com/display/Artifactory/NPM#NPM-authAuthenticatingthenpmClient)
to authenticate with npm and set the environment variables NPM_AUTH and NPM_EMAIL.

The script below does the same which can be copied to your bashrc file or can be run on terminal
```
auth=$(curl -s -u${ARTIFACTORY_USER}:${ARTIFACTORY_API_TOKEN} https://artifactory.corp.adobe.com/artifactory/api/npm/auth)
export NPM_TOKEN=$(echo "${auth}" | grep "_auth" | awk -F " " '{ print $3 }')
export NPM_EMAIL=$(echo "${auth}" | grep "email" | awk -F " " '{ print $3 }')
```

## Versions

Node : 16.13.0+
NPM: 8.1.0+

The steps in this guide are tested against the latest version of node (Darwin 16.13.0) and npm (8.1.0). 
If your version is different then please try to upgrade or log an issue to see if that version can be supported.

# Try out the Playground

The playground is hosted on [git-pages](https://git.corp.adobe.com/pages/livecycle/af2-web-runtime/dist/) and uses the
headless demo instance. To run the playground locally execute the following commands

```
npm install
npx lerna bootstrap
npx lerna build
npx lerna run start
```

The playground is dependent on the JSON Files that are hosted on 
[git](https://git.corp.adobe.com/livecycle/af2-docs/tree/gh-pages/examples) but due to cross origin issue, we have setup
a proxy that does it. To start that proxy, clone the [af2-docs](https://git.corp.adobe.com/livecycle/af2-docs/) 
repository and then run the following commands at the root of that repo
```
npm install
npm run proxy
```

This will start a proxy server hosting all the examples that are needed by the Playground.

# Development

## Getting Started

Our recommendation is to use [Node Version Manager](https://github.com/nvm-sh/nvm) so that you can manage multiple
installation of Node/NPM

### Bootstrap

Once you have cloned this repository and installed the correct version of Node/NPM, run the following command at the
root directory of this project 

```
npm install
npx lerna bootstrap
```

We hoist all the packages at the root project.

## Build

```
npx lerna run build
```

## Tests

```
npx lerna run test
```

## Start the Playground

```
npx lerna run start
```

## Start the Storybook

```
npx lerna run storybook
```

## Build the Storybook

```
npx lerna run build-storybook
```

# Contributing

Please raise an issue and a PR.

# CI/CD
The project is built and tested using Jenkins and latest build status can be obtained 
[here](https://lotus.ci.corp.adobe.com/view/Headless/job/af2-web-runtime/)