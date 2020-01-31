const request = require('request')

const darkSky = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/1c3ef9fe52b1323ddd4c589bab639b54/' 
    + latitude + ',' + longitude  
    request({ url, json:true }, (error,{body}) => {

        if (error) {// low level error handling
        
            callback('Unable to connect to weather service',undefined)                
        
        } else if (body.error) { // error with input query string
        
            callback('Unable to find location', undefined)
        
        } else {
            
            callback(undefined,
                'Data from darksy API:- We are currently in ' + body.timezone  + 
                ' timezone. It is ' + body.currently.summary + ' with ' 
                + body.currently.temperature 
                +' degrees out. There is a ' + body.currently.precipProbability 
                +'% chance of rain'
            )
        }   
    })

}

module.exports = darkSky