#!/bin/bash

node ./availableDevices/de/init.js

node ./availableDevices/de/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/de/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/de/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/de/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/de/topPicks-mostPopular.js