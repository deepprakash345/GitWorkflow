#!/bin/bash

lerna run build
if [ $? -eq 0 ]; then
  lerna run test
  if [ $? -eq 0 ]; then
    if [ ! -d 'tmp-dist' ]; then
      mkdir tmp-dist
    fi
    cp -R packages/forms-headless-sample/build/* tmp-dist
  else
    echo 'test failed. Fix and then run the deploy command'
  fi
else
  echo "build failed"
fi

