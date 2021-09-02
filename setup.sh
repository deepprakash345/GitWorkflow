#!/bin/bash

lerna bootstrap
base=$(pwd)
cd packages/forms-headless-sample/
cd node_modules/react && npm link
cd ../react-dom && npm link
cd ${base}/packages/forms-next-react-core-components/
npm link react react-dom
