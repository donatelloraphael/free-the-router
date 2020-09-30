#!/bin/bash

node ./availableDevices/ca/create-old-index.js

node ./availableDevices/ca/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/ca/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/ca/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/ca/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/ca/remove-old-devices.js
node ./availableDevices/ca/topPicks-mostPopular.js
