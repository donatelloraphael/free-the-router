#!/bin/bash

node ./availableDevices/nl/create-old-index.js

# node ./availableDevices/nl/amazon/modems-amazon-list-nonAPI.js
# node ./availableDevices/nl/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/nl/amazon/routers-amazon-list-nonAPI.js
# node ./availableDevices/nl/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/nl/remove-old-devices.js
node ./availableDevices/nl/topPicks-mostPopular.js
