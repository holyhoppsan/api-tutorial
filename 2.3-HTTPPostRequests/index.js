const express = require('express');
const fs = require('fs');
const app = express();

const historyArray = [];

app.listen(3000, () => console.log('listening at 3000'));

app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

app.post('/api', (request, response) => {
    console.log('I got a request');
    console.log(request.body);

    const data = request.body;

    historyArray.push({
        longitude: data.lat,
        latitiude: data.long
    });

    console.log("history: \n" + JSON.stringify(historyArray, null, 2));

    const newHistoryEntry = JSON.stringify({
        latitiude: data.lat,
        longitude: data.long
    });

    fs.appendFile('history.txt', newHistoryEntry + '\n', (err) => {
        if (err) throw err;
        console.log('Wrote to file');
    });


    response.json({
        status: 'success',
        latitiude: data.lat,
        longitude: data.long
    });
});