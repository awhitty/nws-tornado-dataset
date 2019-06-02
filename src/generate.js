const _ = require('lodash');
const axios = require('axios');
const Papa = require('papaparse');
const {ungzip} = require('node-gzip');

const transformEvent = require('./format');

async function getEventDetailUrls() {
  const indexUrl = 'https://www1.ncdc.noaa.gov/pub/data/swdi/stormevents/csvfiles/';

  const index = await axios.get(indexUrl)
    .then(res => res.data);

  const hrefs = index.match(/href="(StormEvents_details-ftp_v1.0_[\w]+.csv.gz)"/g);

  const urls = hrefs.map(href => {
    const path = href.split('"')[1];
    return indexUrl + path;
  });

  return urls;
}

async function processUrl(url) {
  const zippedData = await axios.get(url, { responseType: 'arraybuffer' }).then(res => res.data);
  const text = (await ungzip(zippedData)).toString();
  const allEvents = Papa.parse(text, {
    header: true,
  }).data;
  const filteredEvents = allEvents.filter(event => event.EVENT_TYPE === 'Tornado');
  filteredEvents.map(transformEvent).forEach(event => {
    process.stdout.write(JSON.stringify(event) + '\n');
  });
}

function parseCsvs(csvTexts) {
  return csvTexts.map(text => {
    return Papa.parse(text, {
      header: true,
    }).data;
  });
}

async function main() {
  const urls = await getEventDetailUrls();
  await urls.slice(-20).map(processUrl);
}

main();

