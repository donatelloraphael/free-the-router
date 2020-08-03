#!/bin/bash

node ./functions/functions-local/availableDevices/CA/create-old-index.js
node ./functions/functions-local/availableDevices/CA/amazon/modems-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/CA/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/CA/amazon/routers-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/CA/amazon/wireless\ access\ points-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/CA/remove-old-devices.js
node ./functions/functions-local/availableDevices/CA/topPicks-mostPopular.js
