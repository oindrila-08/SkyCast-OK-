const api = '3a6df4cfe95a4391c08a18d40ab232c0'; // Replace with your OpenWeatherMap API key

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const timeDisplay = document.querySelector('.time');

document.getElementById('get-weather').addEventListener('click', () => {
  const city = document.getElementById('city-input').value.trim();
  if (city === '') {
    alert('Please enter a city name.');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const { temp } = data.main;
      const place = data.name;
      const { description, icon } = data.weather[0];
      const { sunrise, sunset } = data.sys;
      const timezoneOffset = data.timezone;

      const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      const fahrenheit = (temp * 9) / 5 + 32;

      const sunriseGMT = new Date((sunrise + timezoneOffset) * 1000);
      const sunsetGMT = new Date((sunset + timezoneOffset) * 1000);
      const localTime = new Date(Date.now() + timezoneOffset * 1000 - new Date().getTimezoneOffset() * 60000);
      const localTimeStr = localTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });

      // Update DOM
      iconImg.src = iconUrl;
      loc.textContent = `${place}`;
      desc.textContent = `${description}`;
      tempC.textContent = `${temp.toFixed(2)} °C`;
      tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
      timeDisplay.textContent = `Local Time: ${localTimeStr}`;
      sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
      sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
    })
    .catch((error) => {
      alert(error.message);
    });
});
