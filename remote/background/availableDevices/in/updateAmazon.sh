#!/bin/bash

node ./availableDevices/in/init.js

node ./availableDevices/in/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/in/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/in/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/in/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/in/topPicks-mostPopular.js