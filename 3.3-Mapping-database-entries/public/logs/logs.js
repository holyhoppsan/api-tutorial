const mymap = L.map('checkinMap').setView([0, 0], 1);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(mymap);

getData();
async function getData() {

    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    let index = 0;

    for (item of data) {
        // const root = document.createElement('p');
        // const geo = document.createElement('div');
        // const date = document.createElement('div');

        // geo.textContent = `${item.lat}°, ${item.long}°`;
        // const dateString = new Date(item.timestamp).toLocaleString();
        // date.textContent = dateString;

        // root.append(geo, date);
        // document.body.append(root);

        const marker = L.marker([item.lat, item.long]).addTo(mymap);

        let txt;
        if (item.air < 0) {
            txt = `The weather here at ${item.lat}&deg;, ${item.long}&deg; is ${item.weather.weather[0].description} with a temperature of ${item.weather.main.temp}&deg;
            centigrade. No reading avaiable for air quality.`;
        } else {
            txt = `The weather here at ${item.lat}&deg;, ${item.long}&deg; is ${item.weather.weather[0].description} with a temperature of ${item.weather.main.temp}&deg;
            centigrade. The concentration of particulate matter (${item.air.parameter}) is ${item.air.value} ${item.air.unit} last read on ${item.air.lastUpdated}`;
        }

        marker.bindPopup(txt);
        index++;
    }
}