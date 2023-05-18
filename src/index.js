const map = L.map('map').setView([51.505, -0.09], 13);
const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const inputData = document.querySelector('#ip');
const ipText = document.getElementById('iptexto');
const locationText = document.getElementById('locationtexto');
const timezoneText = document.getElementById('timezonetexto');
const ispText = document.getElementById('isptexto');

const handleSearch = () => {
    const inputValue = inputData.value;
    const search = `https://geo.ipify.org/api/v2/country?apiKey=at_CCuvAPHSE9elB9gmarITddb6VO9YM&ipAddress=${inputValue}`;
    console.log(inputValue);
    fetch(search)
    .then(response => response.json())
    .then(data => {
        const cidade = data.location.region;
        console.log(cidade);

        const latLongSearch = () => {
            const geocoder = L.Control.Geocoder.nominatim();
            geocoder.geocode(cidade, (results) => {
              if (results.length > 0) {
                const { lat, lng } = results[0].center;
                console.log(`Latitude: ${lat}, Longitude: ${lng}`);
                map.flyTo([lat, lng], 13);

                // Atualizar o conteúdo dos elementos HTML com os valores obtidos
                ipText.innerHTML = inputValue;
                locationText.innerHTML = cidade;
                timezoneText.innerHTML = data.location.timezone;
                ispText.innerHTML = data.isp;
              } else {
                console.log(`Não foi possível encontrar as coordenadas para ${inputValue}`);
              }
            });
          };
          latLongSearch()
    })
    .catch(error => {
        console.log(error);
    });
};

const searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', handleSearch);
