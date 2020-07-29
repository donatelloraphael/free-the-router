#!/bin/bash

git checkout production
cp ./firebase-adminsdk-prod.json ./functions/firebase-adminsdk.json
cp env-prod.js env.js