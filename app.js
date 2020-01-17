const request = require('request')
const gecode = require('./utils/geocode')
const darkSky = require('./utils/darksy')

//Challenge 
const address = process.argv[2]
//end challenge

if(address){
    gecode(address, (error, {longitude, latitude, location}) => {
        if (error){
            return console.log('Error', error)
        }
        darkSky(latitude, longitude, (error,forecastdata) => {
            if (error) {
                return console.log('Error', error)
            }
            console.log('Location is ' + location)
            console.log(forecastdata)
        })
    })
} else {
    console.log('No address provided')
}








//Reusable or Replacement code in utils folder

// const urlMapBoxGeoCode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Sykesville.json?access_token=pk.eyJ1Ijoiam9yZGFudGhlZG9kZ2VyIiwiYSI6ImNrNWZwajh0OTBpNmQzbXBiZGF4aHAxdmMifQ.eq4qIDrTC61-qUmM99eWMw&limit=1'
//  request({ url: urlMapBoxGeoCode, json: true }, (error, response) => {
  
//      if (error) {
//          console.log('Unable to connect to Geo Service')
//       } else if (response.body.error || response.body.features.length === 0) {
//           console.log('Unable to find location')
//       } else {
//          const placeName = response.body.features[0].place_name
//          const longitude = response.body.features[0].center[0]
//          const latitude = response.body.features[0].center[1]
//          console.log('The name of the place is ' + placeName
//              + ', with longitude as: ' + longitude + ' and ' +
//              'latitude as: ' + latitude)
//     }
// })


// const urlDarkSky = 'https://api.darksky.net/forecast/1c3ef9fe52b1323ddd4c589bab639b54/37.8267,-122.4233'

// request({ url: urlDarkSky, json: true },(error,response) =>{
//     if (error){//low level error handling
//         console.log('Unable to connect to Weather service')
//     } else if ( response.body.error) {//error with inputor query string
//         console.log('Unable to find location')
//     } else {
//          const temperature = response.body.currently.temperature
//          const rainchance = response.body.currently.precipProbability
//          console.log(response.body.daily.data[0].summary + 'It is currently ' + temperature +  ' degrees out. There is a ' + rainchance + '% chance of rain')
//     }

// })