#!/bin/bash

node ./functions/functions-local/availableDevices/UK/create-old-index.js
node ./functions/functions-local/availableDevices/UK/amazon/modems-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/UK/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/UK/amazon/routers-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/UK/amazon/wireless\ access\ points-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/UK/remove-old-devices.js
node ./functions/functions-local/availableDevices/UK/topPicks-mostPopular.js
