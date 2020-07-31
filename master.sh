#!/bin/bash

git checkout master
cp ./firebase-adminsdk-dev.json ./functions/firebase-adminsdk.json
cp env-dev.js env.js
cp firebaserc-dev .firebaserc