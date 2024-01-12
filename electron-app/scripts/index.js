let get = document.getElementById('get');

get.addEventListener('click', async () => {

    const dateAndTimeNow = new Date();
    const date = dateAndTimeNow.toISOString().split('T')[0];
    const hour = dateAndTimeNow.getHours();

    const response = await fetch(`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${hour}`, {
        method: "GET"
    })
    const data = await response.json();
    console.log(data);

    document.getElementById('price').innerHTML = `${data.price} c/kWh`;
});