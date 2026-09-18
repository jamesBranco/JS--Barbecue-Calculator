const LONG_EVENT_HOURS = 6;
const BEER_CAN_ML = 355;
const LBS_PER_KG = 2.20462;

// Grams (or ml) per adult, for short and long events.
const PER_PERSON = {
    beef: { short: 400, long: 650 },
    beer: { short: 1200, long: 2000 },
    beverage: { short: 1000, long: 1500 },
};

const form = document.getElementById("bbq-form");
const inputAdults = document.getElementById("adults");
const inputChildren = document.getElementById("children");
const inputTime = document.getElementById("time");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    calculate();
});

function calculate() {
    const adults = parseInt(inputAdults.value, 10) || 0;
    const children = parseInt(inputChildren.value, 10) || 0;
    const time = parseFloat(inputTime.value) || 0;

    if (adults + children <= 0 || time <= 0) {
        result.innerHTML = "<p>Please enter the number of guests and the duration.</p>";
        return;
    }

    const beefGrams = perPerson("beef", time) * (adults + children / 2);
    const beerMl = perPerson("beer", time) * adults;
    const beverageMl = perPerson("beverage", time) * (adults + children);

    const pounds = ((beefGrams / 1000) * LBS_PER_KG).toFixed(2);
    const beefUnit = Number(pounds) === 1 ? "pound" : "pounds";
    const beerCans = Math.ceil(beerMl / BEER_CAN_ML);
    const beverageLiters = Math.ceil(beverageMl / 1000);

    result.innerHTML = `
        <p>${pounds} ${beefUnit} of beef</p>
        <p>${beerCans} ${beerCans === 1 ? "can" : "cans"} of beer</p>
        <p>${beverageLiters} ${beverageLiters === 1 ? "liter" : "liters"} of beverage</p>
    `;
}

function perPerson(item, time) {
    return PER_PERSON[item][time >= LONG_EVENT_HOURS ? "long" : "short"];
}
