function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160, 120);

    const mymap = L.map('issMap').setView([0, 0], 1);

    const attribution =
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {
        attribution
    });
    tiles.addTo(mymap);

    const marker = L.marker([0, 0]).addTo(mymap);

    const button = document.getElementById("submit");
    button.addEventListener('click', async event => {
        if ('geolocation' in navigator) {
            console.log('geolocation available');
            navigator.geolocation.getCurrentPosition(async position => {
                const lat = position.coords.latitude;
                document.getElementById('latitude').textContent = lat.toString();
                const long = position.coords.longitude;
                document.getElementById('longitude').textContent = long.toString();

                // Set marker
                marker.setLatLng([
                    lat,
                    long
                ]);

                mymap.setView([lat, long], 15);

                // Capture image from webcam#
                video.loadPixels();
                const image64 = video.canvas.toDataURL();

                // Send data to database
                const data = {
                    lat,
                    long,
                    image64
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
        } else {
            console.log('geolocation not available');
        }
    });
}