#Introduction

Client side runtime for Headless Adaptive Form

#Pre-requisite

Setup the npm environment variables by following [this](https://wiki.corp.adobe.com/display/ES/Dealing+with+Mandatory+Authenticated+Access+to+Artifactory+in+Static+Pipeline+Projects#DealingwithMandatoryAuthenticatedAccesstoArtifactoryinStaticPipelineProjects-ChangesNeededForLocalDevelopment)

#Getting Started

To begin with trigger the command
```
lerna bootstrap
```

## Run the demo

Navigate to `packages/forms-headless-demo` and run the following commands

```
npm install
npm start
```

### CORS - Cross Origin Resource Sharing

This project relies on a CORS configuration running on the target AEM environment and assumes that the app is running on http://localhost:3000 in development mode.

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite Cross-Origin Resource Sharing Policy"
3. Create a new configuration with the following additional values:
    - Allowed Origins: http://localhost:3000


### CSRF - Cross site request forgery

If you are getting errors related to CORS in the development environment, you might want to configure AEM as follows:

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite CSRF Filter"
3. Edit with the following additional values:
    - Whitelist a new user agent (or)
    - Remove POST from the filter method
    

*Sample CORS config for Author environment*
