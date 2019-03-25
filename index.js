const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
app.use(express.static(__dirname + '/views'));

hbs.registerHelper('getCurrentYear', ( ) => {
    return new Date().getFullYear();
});


hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
});

app.use((request,response,next) => {
    response.render('main.hbs',{
        title : 'Info Page',
        year: new Date().getFullYear(),
        welcome: 'The Homepage',
        heading : 'Info'
    });
    var time = new Date ().toString();
    // console.log(${time}: ${request.method} ${request.url});
    var log = (`${time}: ${request.method} ${request.url}`);
    fs.appendFile('server.log', log + '/n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    });
});

app.get('/', (request, response) => {
    response.send({
        name: 'Your Name',
        school: [
            'BCIT',
            'SFU',
            'UBC'
        ]
    })
});

app.get('/about',(request, response) => {
    response.render('homepage.hbs', {
        title : "About page",
        year: new Date().getFullYear(),
        welcome: 'Hello',
        heading : 'Home'
    });
});

app.get('/info',(request, response) => {
    response.render('about.hbs', {
        title : "Info Page",
        year: new Date().getFullYear(),
        welcome: 'Welcome to info',
        heading : 'Info'
    });
});

app.get('/weather',(request, response) => {
    response.render('weather.hbs', {
        title : "Weather",
        year: new Date().getFullYear(),
        welcome: 'Welcome to Weather',
        heading : 'Weather'
    });
});

app.get('/404', (request,response) => {
    response.send({
        error: 'Page not found'
    })
});

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});