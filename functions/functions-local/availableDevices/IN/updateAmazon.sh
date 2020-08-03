#!/bin/bash

node ./functions/functions-local/availableDevices/IN/create-old-index.js
node ./functions/functions-local/availableDevices/IN/amazon/modems-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/IN/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/IN/amazon/routers-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/IN/amazon/wireless\ access\ points-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/IN/remove-old-devices.js
node ./functions/functions-local/availableDevices/IN/topPicks-mostPopular.js
