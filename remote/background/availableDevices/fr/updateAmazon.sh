#!/bin/bash

node ./availableDevices/fr/create-old-index.js

node ./availableDevices/fr/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/fr/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/fr/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/fr/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/fr/remove-old-devices.js
node ./availableDevices/fr/topPicks-mostPopular.js
