const httpReqeust = require('request');

const geoCoordinates = (location,callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1IjoiYWpheXRlY2h3b3Jrc2hvcCIsImEiOiJjanowMXo5cTMwN2M0M21xbGgzN3c2eXk4In0.o3sB4fUIa4Zqbn2Jf17D_Q&limit=1';
    console.log(geoCodeUrl);
    httpReqeust({url:geoCodeUrl,json:true},(error,response) => 
    { 
        if(!error && response.body.features.length != 0)
        {
            const data = response.body.features[0];
            const geoCoordinates = data.center;
            const placeName = data.place_name;
            callback({
                lat: geoCoordinates[0],
                long: geoCoordinates[1],
                place: placeName
            },undefined);
        }
        else
        {
            callback(undefined,'Unable to fetch Geo coordinates');
        }
    });
};

module.exports = geoCoordinates;