if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        document.getElementById('latitude').textContent = lat.toString();
        const long = position.coords.longitude;
        document.getElementById('longitude').textContent = long.toString();

        const api_url = `weather/${lat},${long}`;
        const response = await fetch(api_url);

        response.json().then(data => {
            console.log(data);
            const content = document.createElement('p');
            var nameNode = document.createTextNode(`${data.name}`);
            content.appendChild(nameNode);

            var linebreak = document.createElement('br');
            content.appendChild(linebreak);

            var tempNode = document.createTextNode(`Temp: ${data.main.temp}`);
            content.appendChild(tempNode);

            document.getElementById('weather').append(content);
        });
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