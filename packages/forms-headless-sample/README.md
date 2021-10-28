# Introduction

This is a demo site to test the headless feature. It requires a valid AEM Instance either locally or a cloud instance,
the instructions of both are provided in the below sections

# Try out the Playground locally

The playground is hosted on [git-pages](https://git.corp.adobe.com/pages/livecycle/af2-web-runtime/dist/) and uses the
headless demo instance. To run the playground locally execute the following commands in the current directory :

```
npm install
npm run start
```

The playground is dependent on the JSON Files that are hosted on 
[git](https://git.corp.adobe.com/livecycle/af2-docs/tree/gh-pages/examples) but due to cross origin issue, we have setup
a proxy that enables it. To start that proxy, clone the [af2-docs](https://git.corp.adobe.com/livecycle/af2-docs/) 
repository and then run the following commands at the root of that repo
```
npm install
npm run proxy
```

# Development

## Build the React APP

Since we are using react hooks and there is an ongoing issue with the react hooks and lerna monorepo. See the 
[stackoverflow question](https://stackoverflow.com/questions/62353453/how-to-resolve-multiple-react-apps-to-same-react-package-path-using-webpack-l)
, [React Issue on Git]((https://github.com/facebook/react/issues/15097)) for more details

We have created a script `setup.sh` that performs all the steps required. Execute it and you should be ready to go

## Start the React APP

Navigate to `packages/forms-headless-demo` and run the command `npm run start`. 
You can execute `lerna run start` from the project's root directory as well

Any changes that you would do in the packages, you just need to run the `npm run build` or you can run the build
command for all the packages at the root using lerna `npx lerna run build`

# Integrate with Local AEM Instance

If you are not interested in integrating with AEM, please ignore this and the next section

## One Click Installation

Package containing all the configurations and packages needed inside AEM can be found 
[here](https://artifactory.corp.adobe.com/ui/native/maven-aemforms-release-local/com/adobe/aem/af2-enablement/0.0.8/af2-enablement-0.0.8.zip)

## Build Everything - For the developer inside you

### Enable Headless APIs
Follow the steps mentioned 
[here](https://git.corp.adobe.com/livecycle/af2-rest-api/blob/master/README.md#enable-feature-toggle)
to enable the headless APIs

### Build and Install packages

There are multiple packages to be build and installed. Follow the instructions provided in the Readme of the 
repositories to install the packages

1. WCM Core Components - https://github.com/adobe/aem-core-wcm-components
2. Forms Core Components - https://git.corp.adobe.com/livecycle/aem-core-forms-components

All of them can be built and installed using the following command
```
git clone <repo-url>
cd <repo-folder>
mvn clean install -PautoInstallPackage
```

### AEM Setup Configuration

##### Enable CORS - Cross Origin Resource Sharing for the development server

This project relies on a CORS configuration running on the target AEM environment and 
assumes that the app is running on http://localhost:3000 in development mode.

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite Cross-Origin Resource Sharing Policy"
3. Create a new configuration with the following additional values:
    - Allowed Origins: http://localhost:3000

#### Disable CSRF - Cross site request forgery for demo server

If you are getting errors related to CORS in the development environment, you might want to configure AEM as follows:

1. Navigate to the Configuration Manager (http://localhost:4502/system/console/configMgr)
2. Open the configuration for "Adobe Granite CSRF Filter"
3. Edit with the following additional values:
    - Whitelist a new user agent **forms-headless-demo**
    - Remove POST from the filter method

# Integrate with Skyline Instance

## Using Forms Headless Demo AEM Instance
We have a skyline setup provisioned which can be used to run the demo. The URL of the instance is 
```
https://author-p9552-e11552-cmstg.adobeaemcloud.com
```
Please check you have access to the instance and obtain a developer token from 
[Developer Console](https://dev-console-ns-team-aem-cm-stg-n3460.ethos14-stage-va7.dev.adobeaemcloud.com/#release-cm-p9552-e11552).
The steps are provided in the 
[official helpx page](https://experienceleague.adobe.com/docs/experience-manager-cloud-service/implementing/developing/generating-access-tokens-for-server-side-apis.html?lang=en)

## Custom Skyline Instance

The steps are not yet verified but they should work

1. Enable the feature toggle on your instance
2. Upload the
[af2-enablement](https://artifactory.corp.adobe.com/ui/native/maven-aemforms-release-local/com/adobe/aem/af2-enablement/0.0.8/af2-enablement-0.0.8.zip)
package to your instance via VSTS.
