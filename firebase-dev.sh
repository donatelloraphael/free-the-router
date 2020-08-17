#!/bin/bash

git checkout firebase-dev
cp ./firebase-adminsdk-dev.json ./functions/firebase-adminsdk.json
cp env-dev.js env.js
cp firebaserc-dev .firebaserc
firebase use free-the-router-13e19