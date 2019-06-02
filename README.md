# NWS Tornado Data

The primary artifact of this repo is the file `data/tornadoes.jsonl` containing the last 20 years of tornado events present in the [NWS Storm Events Database](https://www.ncdc.noaa.gov/stormevents/) in [newline-delimited JSON](http://jsonlines.org/).

Any given line in the dataset will take the following shape:

```json
{
  "start_date_time": "2019-02-07T15:17:00.000-05:00",
  "end_date_time": "2019-02-07T15:23:00.000-05:00",
  "episode_id": "133333",
  "event_id": "797876",
  "state": "OHIO",
  "fujita_scale": "EF0",
  "fujita_ordinal": 0,
  "deaths_direct": 0,
  "deaths_indirect": 0,
  "injuries_direct": 0,
  "injuries_indirect": 0
}
```

For more information on what these fields mean, feel free to peruse the generation code and reference the [source fields](https://www1.ncdc.noaa.gov/pub/data/swdi/stormevents/csvfiles/Storm-Data-Export-Format.pdf).

## Updating the dataset

No promises that this repo will be kept up-to-date. If you need a fresh copy of the data, feel free to update it yourself.

Running `npm install && npm run update` should recreate the `data/tornadoes.jsonl` file.

The `src/` folder contains the scripts used to produce the file.
