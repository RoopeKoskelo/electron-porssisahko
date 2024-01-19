const dateAndTimeNow = new Date();
const date = dateAndTimeNow.toISOString().split('T')[0];
const day = dateAndTimeNow.getDay()
const hour = dateAndTimeNow.getHours();

console.log(day + hour);

async function getPrice48h(){
    const response = await fetch(`https://api.porssisahko.net/v1/latest-prices.json`, {
        method: "GET"
    })
    
    const data = await response.json();
    console.log(data);

    const weekday = new Array(7);
    weekday[0]="Sunnuntai";
    weekday[1]="Maanantai";
    weekday[2]="Tiistai";
    weekday[3]="Keskiviikko";
    weekday[4]="Torstai";
    weekday[5]="Perjantai";
    weekday[6]="Lauantai";

    for (i = 0; i < data.prices.length; i++) {
        const time = new Date(data.prices[i].startDate)

        document.getElementById('price').innerHTML+= "<tr><td>" + weekday[time.getDay()] +"</td><td>" + time.getHours() + "</td><td>" + data.prices[i].price + "c/kWh" + "</td>"
    }
}


async function getPriceNow(){
    const response = await fetch(`https://api.porssisahko.net/v1/price.json?date=${date}&hour=${hour}`)
    const data = await response.json()

        document.getElementById('pricenow').innerHTML=`Sähkön hinta on nyt ${data.price} c/kWh`

}

async function checkTime(){                     // i should be hanged for this
    const timeNow = new Date()
    let hoursNow = timeNow.getHours()
    let minutesNow = timeNow.getMinutes()
    let secondsNow = timeNow.getSeconds()

    console.log(hoursNow + "." + minutesNow + ":" + secondsNow);

    if (minutesNow === 0 && secondsNow === 1){
        getPriceNow();
        window.location.reload();
    } else if (hoursNow === 14 && minutesNow === 30 && secondsNow === 1){
        getPrice48h();
        window.location.reload();
    };    
}

window.addEventListener('load', async () => {
    //fetch prices on load
    getPriceNow();
    getPrice48h();

    setInterval(checkTime, 1000);
});