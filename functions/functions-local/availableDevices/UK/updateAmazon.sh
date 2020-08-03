#!/bin/bash

node create-old-index.js
node ./amazon/modems-amazon-list-nonAPI.js
node ./amazon/repeaters\ \&\ extenders-amazon-list-nonAPI.js
node ./amazon/routers-amazon-list-nonAPI.js
node ./amazon/wireless\ access\ points-amazon-list-nonAPI.js
node remove-old-devices.js
node topPicks-mostPopular.js
