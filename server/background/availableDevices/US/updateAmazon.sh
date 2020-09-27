#!/bin/bash

node ./functions/functions-local/availableDevices/US/create-old-index.js
node ./functions/functions-local/availableDevices/US/amazon/modems-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/US/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/US/amazon/routers-amazon-list-nonAPI.js
node ./functions/functions-local/availableDevices/US/amazon/wireless\ access\ points-amazon-list-nonAPI.js