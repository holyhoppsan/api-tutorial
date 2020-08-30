getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    let index = 0;

    for (item of data) {
        const root = document.createElement('p');
        const mood = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');

        mood.textContent = `Vegetable: ${item.vegetable}`;
        geo.textContent = `${item.lat}°, ${item.long}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;
        image.alt = `Database image of Dan ${index}`;

        root.append(mood, geo, date, image);
        document.body.append(root);

        index++;
    }
}