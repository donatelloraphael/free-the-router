#!/bin/bash

node ./functions-local/firebase/availableDevices/US/create-old-index.js
node ./functions-local/firebase/availableDevices/US/amazon/modems-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/US/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/US/amazon/routers-amazon-list-nonAPI.js
node ./functions-local/firebase/availableDevices/US/amazon/wireless\ access\ points-amazon-list-nonAPI.js