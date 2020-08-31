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

        let air;
        try {
            air = json.aq.results[0].measurements[0];

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
            air = -1;
            document.getElementById('aq_parameter').textContent = 'NO READING';
        }

        // Send data to database
        const data = {
            lat,
            long,
            weather,
            air
        };

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        fetch('/api', options);
    });
} else {
    console.log('geolocation not available');
}