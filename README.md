## Introduction

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

# Getting Started

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


# Run the demo

Navigate to `packages/forms-headless-demo` and run the command `npm run start`. 
You can execute `lerna run start` from the project's root directory as well

If you get a react hook error, then trigger the setup.sh command at the root
and run the `lerna run start` or `npm run start` command again

# Integrate with AEM

## Development Setup

Package containing all the configurations and packages needed inside AEM can be found here, https://artifactory.corp.adobe.com/native/maven-aemforms-dev-snapshot-local/com/adobe/aem/af2-enablement/0.0.1-SNAPSHOT/af2-enablement-0.0.1-20210901.095835-1.zip
Till that can be created, please follow the instructions in the following sections.

## Build and Install packages

There are multiple packages to be build and installed. Follow the instructions provided in the Readme of the 
repositories to install the packages

1. Rest API - https://git.corp.adobe.com/livecycle/af2-rest-api
2. WCM Core Components - https://github.com/adobe/aem-core-wcm-components
3. Forms Core Components - https://git.corp.adobe.com/livecycle/aem-core-forms-components

All of them can be built and installed using the following command
```
git clone <repo-url>
cd <repo-folder>
mvn clean install -PautoInstallPackage
```

## Setup Configuration

### Enable CORS - Cross Origin Resource Sharing for the development server

This project relies on a CORS configuration running on the target AEM environment and 
assumes that the app is running on http://localhost:3000 in development mode.

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite Cross-Origin Resource Sharing Policy"
3. Create a new configuration with the following additional values:
    - Allowed Origins: http://localhost:3000


### Disable CSRF - Cross site request forgery for demo server

If you are getting errors related to CORS in the development environment, you might want to configure AEM as follows:

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite CSRF Filter"
3. Edit with the following additional values:
    - Whitelist a new user agent **forms-headless-demo**
    - Remove POST from the filter method
    

