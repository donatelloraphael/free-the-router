#!/bin/bash

node ./availableDevices/ca/init.js

node ./availableDevices/ca/amazon/modems-amazon-list-nonAPI.js
node ./availableDevices/ca/amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./availableDevices/ca/amazon/routers-amazon-list-nonAPI.js
node ./availableDevices/ca/amazon/wireless\ access\ points-amazon-list-nonAPI.js

node ./availableDevices/ca/topPicks-mostPopular.js