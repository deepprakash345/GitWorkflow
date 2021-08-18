#Introduction

Client side runtime for Headless Adaptive Form

# Setup npm authentication

Follow the steps mentioned in the 
[wiki|https://wiki.corp.adobe.com/display/Artifactory/NPM#NPM-authAuthenticatingthenpmClient]
to authenticate with npm and set the environment variables NPM_AUTH and NPM_EMAIL.

The steps have been put in a script does the same which you can copy paste in your bashrc file or run on terminal
```
auth=$(curl -s -u${ARTIFACTORY_USER}:${ARTIFACTORY_API_TOKEN} https://artifactory.corp.adobe.com/artifactory/api/npm/auth)
export NPM_AUTH=$(echo "${auth}" | grep "_auth" | awk -F " " '{ print $3 }')
export NPM_EMAIL=$(echo "${auth}" | grep "email" | awk -F " " '{ print $3 }')
```

#Getting Started

To begin with trigger the command. 
```
lerna bootstrap
```

You might get an error while running this command as react-spectrum and our packages both use the 
adobe scope but are present in different registries. Till the time we figure out a mechanism 
follow these steps

1. In the .npmrc file change the first line to 
```
registry=https://artifactory.corp.adobe.com/artifactory/api/npm/npmjs-remote/
```

2. Trigger the command above `lerna bootstrap` again and it might give errors for our packages but should work.
If it doesn't, then remove your changes in .npmrc file and run the command `lerna bootstrap` again. Ignore
the errors this time


## Run the demo

Navigate to `packages/forms-headless-demo` and run the following commands

```
npm install
npm start
```

## Integrate with AEM