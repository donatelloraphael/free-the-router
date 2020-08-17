#!/bin/bash

git checkout firebase
cp ./firebase-adminsdk-prod.json ./functions/firebase-adminsdk.json
cp env-prod.js env.js
cp firebaserc-prod .firebaserc
firebase use free-the-router-production