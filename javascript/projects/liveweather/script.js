// Initial Variables
const API_KEY = "4c3f87318d7dda9dbf7b495c8c670333";
const submit = document.querySelector("button");
const displayWeather = document.getElementsByClassName("weather");
const displayError = document.getElementsByClassName("error");

// check zipcode entry
submit.addEventListener('click', () => {
    const zipcode = document.querySelector("input").value;
    if (zipcode.length < 4) {
        handleError("Pls enter valid zipcode!")
    }
    else {
        getWeather(zipcode);
    }
})

// handle submit and make API call if valid zip
function getWeather(zipcode) {
    // make api call and get response
    const weather = fetch(`api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => console.log(data))
}

// handle error responses
function handleError(message) {
    console.log(message)
}
