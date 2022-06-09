const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cf72744192d274259c01d7f91ab09d83&query='+ latitude +',' + longitude +'&units=f';  
    request({url, json: true}, (error,{ body } = {}) => {   
    
      if(error) {         
        callback('Unable to connect to Weather Service!',undefined);
      } else if(body.error) {               
        callback('Unable to find the location!',undefined);
      } else{
        callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.');
      }  
      
    });
  }


module.exports = forecast;