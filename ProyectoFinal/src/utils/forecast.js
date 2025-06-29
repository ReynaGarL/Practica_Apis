const request = require('request')
require('dotenv').config()

const forecast = (location, callback) => {
    const apiKey = process.env.WEATHERSTACK_KEY
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(location)}&units=m`

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('No se pudo conectar con el servicio de clima.', undefined)
        } else if (body.error) {
            callback('No se pudo encontrar la ubicación.', undefined)
        } else {
            const data = body.current
            const region = Buffer.from(body.location.region, 'latin1').toString('utf8');
            const info = `${body.location.name}, ${region}, ${body.location.country}: ${data.weather_descriptions[0]}. Actualmente hay ${data.temperature}°C. Se siente como ${data.feelslike}°C. Humedad: ${data.humidity}%.`;
            callback(undefined, info);
        }
    })
}

module.exports = forecast
