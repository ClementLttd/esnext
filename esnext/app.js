//let
let favoriteCityId = 'rome';
console.log(favoriteCityId);
favoriteCityId = 'paris';
console.log(favoriteCityId);

//const
const citiesId = ['paris', 'nyc', 'rome', 'rio-de-janeiro'];
console.log(citiesId);
//citiesId = {};
citiesId.push('tokyo');
console.log(citiesId);

//creation d'objet
function getWeather(citiesId) {
    let city = citiesId.toUpperCase();
    let temperature = 20;
    return { city, temperature };
}
const weather = getWeather(favoriteCityId);
console.log(weather);

//affectation destructurée
const { city, temperature } = weather;
console.log(city);
console.log(temperature);


//rest operator
const [parisId, nycId, ...othersCitiesId] = citiesId;
console.log(parisId);
console.log(nycId);
console.log(othersCitiesId);


//classe
class Trip {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
    }

    toString() {
        return 'Trip [' + this.id + ', ' + this.name + ', ' + this.imageUrl + ', ' + this._price + ']';
    }
    get price() {
        return this._price;
    }
    set price(newPrice) {
        this._price = newPrice;
    }
    static getDefaultTrip() {
        return new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg');
    }


}
let parisTrip = new Trip('paris', 'Paris', ' img/paris.jpg');
console.log(parisTrip);
console.log(parisTrip.name);
console.log(parisTrip.toString());
console.log(parisTrip._price = 100);
console.log(parisTrip.toString());

const defaultTrip = Trip.getDefaultTrip();
console.log(defaultTrip.toString());


//heritage
class FreeTrip extends Trip {
    constructor(id, name, imageUrl) {
        super(id, name, imageUrl);
        this._price = 0;
    }
    toString() {
        return 'Free' + super.toString();
    }
}

const freeTrip = new FreeTrip('nantes', 'Nantes', 'img/nantes.jpg');
console.log(freeTrip.toString());



//promise, set, map, arrow function
class TripService {
    constructor() {
        this.trips = new Set();
        this.trips.add(new Trip('paris', 'Paris', 'img/paris.jpg'));
        this.trips.add(new Trip('nantes', 'Nantes', 'img/nantes.jpg'));
        this.trips.add(new Trip('rio-de-janeiro', 'Rio de Janeiro', 'img/rio-de-janeiro.jpg'));
    }

    findByName(tripName) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                this.trips.forEach(e => {
                    if (e.name === tripName) {
                        resolve(e);
                    }
                })
                reject(`no trip with name ${tripName}`);
            }, 2000)
        });
    }
}

class PriceService {
    constructor() {
        this.prices = new Map();
        this.prices.set('paris', 100);
        this.prices.set('rio-de-janeiro', 800);

    }
    findPriceByTripId(tripId) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                if (this.prices.has(tripId)) {
                    resolve(this.prices.get(tripId));
                }

                reject(`No price found for trip id ${tripId}`);

            }, 2000)
        });
    }
}

let tripService = new TripService();
let priceService = new PriceService();

tripService.findByName('Paris')
    .then(tripTrouve => console.log(`Trip found : ${tripTrouve}`))
    .catch(err => console.log(err));

tripService.findByName('Toulouse')
    .then(tripTrouve => console.log(`Trip found : ${tripTrouve}`))
    .catch(err => console.log(err));

tripService.findByName('Rio de Janeiro')
    .then(tripTrouve => priceService.findPriceByTripId(tripTrouve.id))
    .then(priceTrouve => console.log(`Price found : ${priceTrouve}`))
    .catch(err => console.log(err));

tripService.findByName('Nantes')
    .then(tripTrouve => priceService.findPriceByTripId(tripTrouve.id))
    .then(priceTrouve => console.log(`Price found : ${priceTrouve}`))
    .catch(err => console.log(err));