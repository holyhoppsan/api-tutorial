getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    let index = 0;

    for (item of data) {
        const root = document.createElement('p');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        geo.textContent = `${item.lat}°, ${item.long}°`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        root.append(geo, date);
        document.body.append(root);

        index++;
    }
}