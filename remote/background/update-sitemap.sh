#!/bin/bash

curl https://www.google.com/ping?sitemap=https://freetherouter.com/sitemap.xml
echo "\nPinged Google\n"
curl https://www.bing.com/ping?sitemap=https%3A%2F%2Ffreetherouter.com/sitemap.xml
echo "\nPinged Bing\n"