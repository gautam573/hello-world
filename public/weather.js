const request = require('request');
const yargs = require('yargs');


const argv = yargs
    .options({
        country: {
            demand: true,
            alias: 'c',
            describe: 'Search for a country',
            string: true
        }
    })
    .help()
    .argv;

var getCapital = (country) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://restcountries.eu/rest/v2/name/${encodeURIComponent(country)}?fullText=true`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Cannot connect to Rest Countries');
            } else if (body.status == 404) {
                reject('Cannot find requested country');
            } else if ((body[0].name).toUpperCase() == (country).toUpperCase()) {
                resolve(body[0].capital);
            }
        });
    });
};





var getWeather = (capital) => {
    return new Promise((resolve, reject) => {
        request({
            url: `http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=imperial&appid=41801cbcfc459a16d83d3e646db2ed3b`,
            json: true
        }, (error, response, body) => {
            resolve({speed:body.wind.speed,temp: body.main.temp});
        });
    })
};

