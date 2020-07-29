#!/bin/bash

git checkout development
cp ./firebase-adminsdk-dev.json ./functions/firebase-adminsdk.json
cp env-dev.js env.js