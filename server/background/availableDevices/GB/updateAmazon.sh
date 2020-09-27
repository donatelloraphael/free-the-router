#!/bin/bash

node ./functions/functions-local/availableDevices/GB/create-old-index.js
node ./functions/functions-local/availableDevices/GB/amazon/modems-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/GB/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/GB/amazon/routers-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/GB/amazon/wireless\ access\ points-amazon-list-nonAPI.js
