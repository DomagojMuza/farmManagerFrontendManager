var express = require('express')
var vrijeme = require('../services/prognoza.js')
var vijesti = require('../services/vijesti.js');

var WeatherRoute = new express.Router()
var NewsRoute = new express.Router()

WeatherRoute.get('/api/weather/today', async (req, res) =>{
    var grad = req.query.grad
    try {
        var data = await vrijeme.trenutnoVrijeme(grad)
        res.send(data)
    } catch (error) {
        res.status(406).send(error)
    }
})

WeatherRoute.get('/api/weather/nextDays', async (req, res) =>{
    var grad = req.query.grad
    try {
        var data = await vrijeme.vrijemeNarednihDana(grad)
        res.send(data)
    } catch (error) {
        res.status(406).send(error)
    }
})




NewsRoute.get('/api/news', async (req, res) =>{
    let page = req.query.page
    let data = await vijesti(page);
    res.send(data);
})


module.exports = {
    WeatherRoute: WeatherRoute,
    NewsRoute: NewsRoute}