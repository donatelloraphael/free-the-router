#!/bin/bash

node ./functions-local/firebase/availableDevices/GB/create-old-index.js
node ./functions-local/firebase/availableDevices/GB/amazon/modems-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/GB/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/GB/amazon/routers-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/GB/amazon/wireless\ access\ points-amazon-list-nonAPI.js
