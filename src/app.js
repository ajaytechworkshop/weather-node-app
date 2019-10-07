const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
const port = process.env.PORT || 3010;

//configuration for express to server html responses
app.use(express.static(publicDirectoryPath));


//set view engine (handlebars is the view engine and the views path)
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.listen(port,() => {
    console.log('Server is up on port '+port);
});

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        messageText:'Type in the location below to get the weather details',
        name: 'AK'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About',
        name: 'AK'
    });
});

app.get('/help',(req,res)=> {
    res.render('help',{
        title:'Help',
        messageText:'Help Message',
        name:'AK'
    });
}); 

app.get('/weather',(req,res) => {
    if(req.query.addr)
    {
        geocode(req.query.addr,(locationData,error)=>
        {
            if(locationData){
                forecast(locationData.long,locationData.lat,(forecastData,error) => 
                {
                    if(forecastData){
                        res.send({
                            location: locationData.place,
                            summary: forecastData.summary,
                            temperature : forecastData.temperature,
                            precipProbability : forecastData.precipProbability 
                        });
                     }
                     else{
                        res.send({
                            error: 'Error while retrieving the forecast data'
                        });
                     }
                });
            }
            else{
                res.send({
                    error:  'Unable to find location.Try an other location'
                });
            }
        });
    }
    else{
        res.send({
            error: 'Please provide an address'
        });
    }
});

app.get('*',(rey,res) => {
    res.render('error',{
        title: 'Error',
        errorText: 'The requested page doesnot exist',
        name: 'AK'
    }); 
});
