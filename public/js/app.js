console.log('Client side javascript file is loaded.')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationElement = document.querySelector('#location')
const forecastElement = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    search.value = ''
    locationElement.textContent = 'Loading...'
    forecastElement.textContent = ''
    fetch(`/weather?address=${location}`).then(response => {
      response.json().then(data => {
        if (data.error) {
          locationElement.textContent = data.error
        } else {
            locationElement.textContent = data.location
            forecastElement.textContent = data.forecast
        }
      })
    })

})