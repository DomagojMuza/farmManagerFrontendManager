const request =  require('request');
const moment = require('moment');
const utf8  = require('utf8')


const trenutnoVrijeme = (mjesto) =>{
    return new Promise((resolve, reject) =>{
        if(!mjesto) {return reject({error : "Input city name"}); }
        let g = utf8.encode(mjesto)
        const urlPrognoza ="https://api.openweathermap.org/data/2.5/weather?q=" + g + "&units=metric&appid=f2ca8e5762e14e276c143dea62e26796"

        request({url:urlPrognoza, json: true}, (error, response)=>{
            if(response === undefined){
                return reject({error:"Problem u povezivanju"})
            }
            else if(response.body.cod === '404'){
                return reject({error:"Pogrešno unseno ime grada"})
            }
            else{
                const prognoza = [{
                    vrijeme : response.body.weather[0].description.charAt(0).toUpperCase() + response.body.weather[0].description.slice(1),
                    temp: response.body.main.temp + "°C",
                    temp_max: response.body.main.temp_max + "°C",
                    temp_min: response.body.main.temp_min + "°C",
                    brzina_vjetra: response.body.wind.speed + "m/s",
                    icon: "http://openweathermap.org/img/wn/" + response.body.weather[0].icon + "@2x.png"
                }]
                const grad = response.body.name
                resolve({prognoza, grad})
            }
        })
    
    })
}

const vrijemeNarednihDana = (mjesto, callback) =>{
    return new Promise((resolve, reject) =>{
        if(!mjesto) {return reject({error : "Input city name"}); }
        let g = utf8.encode(mjesto)
        const urlPrognoza = "https://api.openweathermap.org/data/2.5/forecast?q=" + g + "&units=metric&cnt=20&appid=f2ca8e5762e14e276c143dea62e26796"
        request({url:urlPrognoza, json:true}, (error, response) =>{ 
        if(response === undefined){
            return reject({error: "Connection problem"});
            }
            else if(response.body.cod === '404'){
                return reject({error: "Wrong city name"});
            }
            var prognoza = response.body.list.map((item) =>{
                return {
                    vrijeme : item.weather[0].description.charAt(0).toUpperCase() + item.weather[0].description.slice(1),
                    temp: item.main.temp + "°C",
                    brzina_vjetra: item.wind.speed + "m/s",
                    datum: moment(item.dt_txt).format("D MM, H:mm"),
                    icon:  "http://openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png"
                }
            })
            
            const grad = response.body.city.name
            resolve({prognoza, grad})
        })
    })

}

module.exports = {trenutnoVrijeme: trenutnoVrijeme, vrijemeNarednihDana: vrijemeNarednihDana}