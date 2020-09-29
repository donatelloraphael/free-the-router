#!/bin/bash

node ./availableDevices/us/create-old-index.js

node ./availableDevices/us/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/us/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/us/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/us/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/us/remove-old-devices.js
# node ./availableDevices/us/topPicks-mostPopular.js
