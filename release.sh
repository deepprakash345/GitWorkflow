#!/bin/bash -x

npm ci
retVal=$?
if [ $retVal -ne 0 ]; then
    echo "Error while executing npm ci"
    exit $retVal
fi
npx lerna bootstrap --ci
if [ $retVal -ne 0 ]; then
    echo "Error while executing npx lerna bootstrap --ci"
    exit $retVal
fi
npx lerna run build
if [ $retVal -ne 0 ]; then
    echo "Error while executing npx lerna run build"
    exit $retVal
fi
npx lerna run test-ci
if [ $retVal -ne 0 ]; then
    echo "error while executing npx lerna run build"
    exit $retVal
fi
npx lerna version minor --no-push --yes -m ":release"
if [ $retVal -ne 0 ]; then
    echo "error while executing npx lerna version"
    exit $retVal
fi
npx lerna publish from-package --yes
if [ $retVal -ne 0 ]; then
    echo "error while executing npx lerna publish"
    exit $retVal
fi
npx lerna exec -- npm install
if [ $retVal -ne 0 ]; then
    echo "error while executing npx lerna publish"
    exit $retVal
fi
git commit -a -m ":release Updating package-lock.json after version bump"
if [ $retVal -ne 0 ]; then
    echo "error while executing git commit"
    exit $retVal
fi
git push origin --tags
if [ $retVal -ne 0 ]; then
    echo "error while pushing to origin"
    exit $retVal
fi