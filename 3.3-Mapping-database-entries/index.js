const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const {
    request,
    response
} = require('express');
const app = express();

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
});

app.post('/api', (request, response) => {
    console.log('I got a request');
    console.log(request.body);

    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);
    response.json({
        status: 'success',
        timestamp: timestamp,
        latitiude: data.lat,
        longitude: data.long
    });
});

app.get('/weather/:lat,:long', async (request, response) => {
    console.log('I got a weather request');
    const api_key = process.env.WEATHER_API_KEY;
    const weather_url = `http://api.openweathermap.org/data/2.5/weather?lat=${request.params.lat}&lon=${request.params.long}&units=metric&appid=${api_key}`;
    const weather_response = await fetch(weather_url);
    const weather_data = await weather_response.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${request.params.lat},${request.params.long}`;
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();

    const data = {
        weather: weather_data,
        aq: aq_data
    };

    response.json(data);
});