# Introduction

Client side runtime for Headless Adaptive Form. The headless adaptive form is based on the [crispr form specification](https://git.corp.adobe.com/pages/livecycle/af2-docs/spec/latest/), which acts as the guiding principle for creating the JSON for headless forms.

Documentation site: https://git.corp.adobe.com/pages/livecycle/af2-web-runtime/story/

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

## Using Adaptive Form Super Component

To use adaptive form super component, add the following dependency,
```
npm i @aemforms/crispr-react-bindings @aemforms/crispr-react-core-components
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
npm run bootstrap
npm run build
npm run start
```

The playground is dependent on the JSON Files that are hosted on 
[git](https://git.corp.adobe.com/livecycle/af2-docs/tree/gh-pages/examples) but due to cross origin issue, we have setup
a proxy that does it. To start that proxy, navigate to the `docs` folder and run the following command
```
npm install
npm run proxy
```

This will start a proxy server hosting all the examples that are needed by the Playground.

# Development

## Getting Started

Our recommendation is to use [Node Version Manager](https://github.com/nvm-sh/nvm) so that you can manage multiple
installation of Node/NPM

### Clone the repository

Use `git clone` command to clone the repository. To run the storybook locally, you might need to initialize the 
git submodule that contains the examples used in the storybook. The commands to do that are
`git submodule init` && `git submodule update`

There are other ways to do that but for that you need to refer to the [git reference](https://git-scm.com/book/en/v2/Git-Tools-Submodules)


### Bootstrap

Once you have cloned this repository and installed the correct version of Node/NPM, run the following command at the
root directory of this project 

```
npm run bootstrap
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

# CI/CD
The project is built and tested using Jenkins and latest build status can be obtained 
[here](https://lotus.ci.corp.adobe.com/view/Headless/job/af2-web-runtime/)