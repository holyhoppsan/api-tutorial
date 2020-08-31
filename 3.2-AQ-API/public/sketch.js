if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        document.getElementById('latitude').textContent = lat.toString();
        const long = position.coords.longitude;
        document.getElementById('longitude').textContent = long.toString();

        const api_url = `weather/${lat},${long}`;
        const response = await fetch(api_url);
        const json = await response.json();

        console.log(json);

        const weather = json.weather;

        try {
            const air = json.aq.results[0].measurements[0];

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = long;
            document.getElementById('summary').textContent = weather.weather[0].description;
            document.getElementById('temperature').textContent = weather.main.temp;

            document.getElementById('aq_parameter').textContent = air.parameter;
            document.getElementById('aq_value').textContent = air.value;
            document.getElementById('aq_units').textContent = air.unit;
            document.getElementById('aq_date').textContent = air.lastUpdated;

        } catch (error) {
            console.error(error);
            document.getElementById('aq_parameter').textContent = 'NO READING';
        }
    });
} else {
    console.log('geolocation not available');
}

const button = document.getElementById("submit");
button.addEventListener('click', async event => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            document.getElementById('latitude').textContent = lat.toString();
            const long = position.coords.longitude;
            document.getElementById('longitude').textContent = long.toString();

            // Send data to database
            const data = {
                lat,
                long
            };

            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('/api', options);
            const json = await response.json();
        });
    }
});