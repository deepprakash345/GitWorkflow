## Introduction

Client side runtime for Headless Adaptive Form

# Setup npm authentication

Follow the steps mentioned in the 
[wiki|https://wiki.corp.adobe.com/display/Artifactory/NPM#NPM-authAuthenticatingthenpmClient]
to authenticate with npm and set the environment variables NPM_AUTH and NPM_EMAIL.

The steps have been put in a script does the same which you can copy paste in your bashrc file or run on terminal
```
auth=$(curl -s -u${ARTIFACTORY_USER}:${ARTIFACTORY_API_TOKEN} https://artifactory.corp.adobe.com/artifactory/api/npm/auth)
export NPM_TOKEN=$(echo "${auth}" | grep "_auth" | awk -F " " '{ print $3 }')
export NPM_EMAIL=$(echo "${auth}" | grep "email" | awk -F " " '{ print $3 }')
```

# Getting Started

To begin with trigger the command. 
```
lerna bootstrap
```

## Running tests

```
lerna run test
```

## Build

```
lerna run build
```

#Demo
The demo app is hosted on [git-pages](ttps://git.corp.adobe.com/pages/livecycle/af2-web-runtime/dist/) and uses the
headless demo instance. To run the demo locally see the [official guide](/packages/forms-headless-sample/README.md)

# Contributing

The project is currently closed for contributions. We are still finalizing certain aspects of CI/CD and once they are done
we will accept PRs.

# CI/CD
The project is built and tested using Jenkins and latest build status can be obtained 
[here](https://lotus.ci.corp.adobe.com/view/Headless/job/af2-web-runtime/)