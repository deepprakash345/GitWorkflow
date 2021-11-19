#!/bin/bash
# why this is needed ? Read https://github.com/facebook/react/issues/13991
npm install
npx lerna bootstrap
npx lerna run build
base=$(pwd)
cd packages/forms-headless-sample/
cd node_modules/react && npm link
cd ../react-dom && npm link
cd ../@adobe/react-spectrum && npm link
cd ${base}/packages/forms-next-react-core-components/
npm link react react-dom @adobe/react-spectrum
cd ${base}/packages/react-bindings/
npm link react react-dom
# npm link installs other dependencies, creating symlink again for local packages
npx lerna bootstrap
