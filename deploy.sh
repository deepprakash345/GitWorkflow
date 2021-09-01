#!/bin/bash

cd packages/forms-headless-sample
npm run build
cd ../../
if [ ! -d 'tmp-dist' ]; then
  mkdir tmp-dist
fi
cp -R packages/forms-headless-sample/build/* tmp-dist


