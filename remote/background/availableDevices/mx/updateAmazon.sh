#!/bin/bash

node ./availableDevices/mx/create-old-index.js

# node ./availableDevices/mx/amazon/modems-amazon-list-nonAPI.js
# node ./availableDevices/mx/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/mx/amazon/routers-amazon-list-nonAPI.js
# node ./availableDevices/mx/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/mx/remove-old-devices.js
node ./availableDevices/mx/topPicks-mostPopular.js
