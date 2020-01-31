console.log('Client side js is loaded!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#weatherInfo')
const messageTwo = document.querySelector('#errorInfo')
//messageOne.textContent = 'From Javascript'


//to run some code when user submits we need an event listner


weatherForm.addEventListener('submit', (e) => {
    if (!search.value) {
        messageOne.textContent = ''
        messageTwo.textContent = ''        
    }else{
        messageOne.textContent = 'Loading'
        messageTwo.textContent = ''
    }
    
    e.preventDefault()
    const location = search.value
    if (!location) {
        console.log('You must provide a valid city')
    } else {
        fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
                messageTwo.data = ''
            } else {
                //console.log(location)
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                }
            })
        })    
    }

})
 