#!/bin/bash

node ./functions-local/firebase/availableDevices/IN/create-old-index.js
node ./functions-local/firebase/availableDevices/IN/amazon/modems-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/IN/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/IN/amazon/routers-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/IN/amazon/wireless\ access\ points-amazon-list-nonAPI.js