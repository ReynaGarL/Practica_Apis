const path = require('path')
const hbs = require('hbs')
const express = require('express')
const forecast = require('./utils/forecast') 
const app = express()
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Clima',
        name: 'Reyna Garcia'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Debes ingresar una localidad!'
        })
    }

    forecast(req.query.address, (error, forecastData) => {
        if (error) {
            return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location: req.query.address
        })
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})