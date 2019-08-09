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
          ' It is currently ' +
          body.currently.temperature +
          ' degrees out. High today ' +
          body.daily.data[0].temperatureHigh +
          ' with a Low of ' +
          body.daily.data[0].temperatureLow +
          ' There is a ' +
          body.currently.precipProbability +
          '% chance of rain.  The humidity is ' +
          body.daily.data[0].humidity * 100 +
          '%'
      )
    }
  })
}

module.exports = forecast
