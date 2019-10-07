const httpReqeust = require('request');

const forecast = (longitude,latitude,callback) => 
{    
    const url = 'https://api.darksky.net/forecast/a48b74ede9a022af9eae3e8a19f0c50f/'+longitude+','+latitude+'?units=si';
    httpReqeust({url: url,json: true},(error,response) => {
        if(!error && !response.body.error){
            const currentWeather = response.body.currently;
            callback(
                {
                    summary: response.body.daily.data[0].summary,
                    temperature: currentWeather.temperature,
                    precipProbability: currentWeather.precipProbability
                },undefined);
        }else{
            console.log('Unable to connect to Weather service');
        }
    });
}



module.exports = forecast;