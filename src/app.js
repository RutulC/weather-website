const path = require('path');       
const express = require('express');
const hbs = require('hbs');  
const geocode = require('./utils/geocode');   
const forecast = require('./utils/forecast');

const app = express();        

const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');       
const partialsPath = path.join(__dirname, '../templates/partials');


app.set('views',viewPath);     
app.set('view engine', 'hbs');    
hbs.registerPartials(partialsPath);          

//Setup static directory to serve
app.use(express.static(publicDirectory))    

app.get('',(req,res) => {
    res.render('index' ,{      
        title: 'Weather App',
        name: 'Rutul Chindarkar'
    });  
});


app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Rutul Chindarkar'
    });
})

app.get('/about', (req,res) => {
    res.render('about',{           
        title: 'About Me',
        name: 'Rutul Chindarkar'
    });
});


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Enter the valid address'
        });
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {        
        if(error){
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error});
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req,res) => {    
    if(!req.query.search){
        return res.send({      
            error: 'You must provide a search term'
        });
    }
    
    
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('error',{
        title: '404 Help',
        message: 'Help Article not found',
        name: 'Rutul Chindarkar'
    });
});


app.get('*', (req,res) => {    
    res.render('error',{
        title: 404,
        message: 'Page not found',
        name: 'Rutul Chindarkar'
    });
});

// Starting the server up!
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


