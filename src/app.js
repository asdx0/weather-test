const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))


const app = express()

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

// routes
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    // using destructuring for latitude, longitude, and location
    geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return res.send({error: err})
      }
      forecast(latitude, longitude, (err, forecastData) => {
        if (err) {
          return res.send({error: err})
        }
        res.send({
            address: req.query.address,
            location,
            forecast: forecastData
        })
      })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ashley dePreaux'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashley dePreaux'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Need help? We\'ve got you covered!',
        name: 'Ashley dePreaux'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404!',
        message: 'Help article not found.',
        name: 'Ashley dePreaux'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
      title: '404!',
      message: 'Page not found.',
      name: 'Ashley dePreaux'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})