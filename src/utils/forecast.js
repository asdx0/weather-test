const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/cb730b6efbeb79da263b818000809c24/${lat},${long}`
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to collect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location.', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees. There is a ${body.currently.precipProbability * 100}% chance of rain.`)
    }
  })
}

module.exports = forecast