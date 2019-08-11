const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/6604bf34449a67dff64b8c0c3e66354e/' +
    latitude +
    ',' +
    longitude

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      console.log(body.daily.data[0])
      callback(
        undefined,
        body.daily.data[0].summary +
          ' Currently ' +
          Math.floor(body.currently.temperature) +
          '\u00B0' +
          '  /  ' +
          ' High Temp ' +
          Math.floor(body.daily.data[0].temperatureHigh) +
          '\u00B0' +
          '  /  ' +
          ' Low Temp ' +
          Math.floor(body.daily.data[0].temperatureLow) +
          '\u00B0' +
          '  /  ' +
          body.currently.precipProbability +
          '% chance of rain.  The humidity is ' +
          body.daily.data[0].humidity * 100 +
          '%'
      )
    }
  })
}

module.exports = forecast
