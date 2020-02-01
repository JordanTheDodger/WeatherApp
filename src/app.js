const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const darkSky = require('./utils/darksy')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
console.log(__dirname)
const publicPathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engne and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPathDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jordan',
        message: 'Use this webstie to know the weather',
        errorMessage:'Provide a valid address'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jordan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jordan',
        message: 'For promotion and other questions please reach out to us at abc@gmail.com'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'Provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {
        if (error) {
            return res.send( {error} )
        }

        darkSky(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send( {error} )
            }

            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })

        })
    })

    //  res.render('weather', {
    //      title:'Weather',
    //      name:'Jordan',
    //      forecast: 'It is clear',
    //      location: 'Location is ' + req.query.address
    //  })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Jordan',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jordan',
        message: 'Error 404. Page not found.'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})