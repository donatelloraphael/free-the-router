const fs = require('fs');
const https = require('https');
const zlib = require('zlib');
const path = require('path');
const tar = require('tar');

const link =`https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=Ni0X8wZ9menZx7bt&suffix=tar.gz`;

const downloadPath1 = path.join(__dirname, '..', '..', 'public');
const downloadPath2 = path.join(__dirname, '..', '..', 'src', 'static');

const download = (url) =>
  new Promise((resolve) => {
    https.get(url, function (response) {
      resolve(response.pipe(zlib.createGunzip({})));
    });
  });

console.log('Downloading maxmind databases...');

download(link).then((result) =>
  result.pipe(tar.t()).on('entry', (entry) => {
    if (entry.path.endsWith('.mmdb')) {
      const dstFilename1 = path.join(downloadPath1, path.basename(entry.path));
      const dstFilename2 = path.join(downloadPath2, path.basename(entry.path));

      entry.pipe(fs.createWriteStream(dstFilename1));
      entry.pipe(fs.createWriteStream(dstFilename2));
    }
  })
);