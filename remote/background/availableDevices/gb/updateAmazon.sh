#!/bin/bash

node ./availableDevices/gb/create-old-index.js

node ./availableDevices/gb/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/gb/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/gb/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/gb/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/gb/remove-old-devices.js
node ./availableDevices/gb/topPicks-mostPopular.js
