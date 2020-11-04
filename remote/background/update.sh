#!/bin/bash

node ./redis-sync.js
echo "Synced MongoDB and Redis"
echo " "

node ./sitemap.js
echo "Finished creating sitemap."
echo " "

# curl https://www.google.com/ping?sitemap=https%3A%2F%2Ffreetherouter.com%2Fsitemap.xml
# echo "Pinged Google"
# echo " "
# curl https://www.bing.com/ping?sitemap=https%3A%2F%2Ffreetherouter.com%2Fsitemap.xml
# echo "Pinged Bing"