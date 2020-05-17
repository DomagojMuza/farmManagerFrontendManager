const express = require('express');
const cors = require('cors');
require('./db/mongoose')
// const './middleware/cron'
// const {mailSender} = './email/mail'

const {UserRouter} = require('./routes/user')
var FieldRoute = require('./routes/field')
var ActivityRoute = require('./routes/activity')
var PDFRoute = require('./routes/pdf')
var restRoute = require('./routes/weather_and_news')




const app = express();
app.use(cors())
app.use(express.json())

// app.get('/mail', async (req, res) =>{
//     const mail = await mailSender()
//     console.log("mail", mail);
//     res.send(mail)
// })
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/../public/'));
}
  

const port = process.env.PORT || 3000;


// app.use(UserRouter)
app.use(FieldRoute)
app.use(ActivityRoute)
app.use(restRoute.WeatherRoute)
app.use(restRoute.NewsRoute)
app.use(PDFRoute)




 

app.listen(port, ()=>{
    console.log(`Server je na portu ${port}`);
})




