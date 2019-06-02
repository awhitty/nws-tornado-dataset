const luxon = require('luxon');

// This conversion is a bit of a kludge due to ambiguity of timestamps in
// dataset for events before 2000.
function timestampToISO(yearmonth, timestamp, zoneish) {
  const format = 'dd-MMM-yy hh:mm:ss';
  const zone = luxon.FixedOffsetZone.parseSpecifier(`UTC${zoneish.slice(3)}`);
  return luxon.DateTime.fromFormat(timestamp, format, { zone })
    .set({year: yearmonth.slice(0,4)})
    .toISO();
}

function fujitaOrdinal(fuj) {
  const lookup = {
    EF0: 0,
    EF1: 1,
    EF2: 2,
    EF3: 3,
    EF4: 4,
    EF5: 5,
  };

  return lookup[fuj];
}

module.exports = function transformEvent(event) {
  return {
    start_date_time: timestampToISO(event.BEGIN_YEARMONTH, event.BEGIN_DATE_TIME, event.CZ_TIMEZONE),
    end_date_time: timestampToISO(event.END_YEARMONTH, event.END_DATE_TIME, event.CZ_TIMEZONE),
    episode_id: event.EPISODE_ID,
    event_id: event.EVENT_ID,
    state: event.STATE,
    fujita_scale: event.TOR_F_SCALE,
    fujita_ordinal: fujitaOrdinal(event.TOR_F_SCALE),
    deaths_direct: +event.DEATHS_DIRECT,
    deaths_indirect: +event.DEATHS_INDIRECT,
    injuries_direct: +event.INJURIES_DIRECT,
    injuries_indirect: +event.INJURIES_INDIRECT,
  }
}
