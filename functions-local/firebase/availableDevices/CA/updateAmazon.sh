#!/bin/bash

node ./functions-local/firebase/availableDevices/CA/create-old-index.js
node ./functions-local/firebase/availableDevices/CA/amazon/modems-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/CA/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/CA/amazon/routers-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/CA/amazon/wireless\ access\ points-amazon-list-nonAPI.js

