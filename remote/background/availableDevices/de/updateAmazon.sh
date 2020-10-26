#!/bin/bash

node ./availableDevices/de/create-old-index.js

node ./availableDevices/de/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/de/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/de/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/de/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/de/remove-old-devices.js
node ./availableDevices/de/topPicks-mostPopular.js
