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
    const api_url = `http://api.openweathermap.org/data/2.5/weather?lat=${request.params.lat}&lon=${request.params.long}&units=metric&appid=0b80e5cc8dcd9dd0f29f5163c233cb1b`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
});