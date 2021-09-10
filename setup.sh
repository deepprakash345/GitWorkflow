#!/bin/bash
# why this is needed ? Read https://github.com/facebook/react/issues/13991
lerna bootstrap
base=$(pwd)
cd packages/forms-headless-sample/
cd node_modules/react && npm link
cd ../react-dom && npm link
cd ${base}/packages/forms-next-react-core-components/
npm link react react-dom
# npm link installs other dependencies
lerna bootstrap
