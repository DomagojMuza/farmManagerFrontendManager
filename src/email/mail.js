const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    "652990461052-q7se5turtkrcki9knfbsv9ps7lhcqsok.apps.googleusercontent.com", // ClientID
    "DhGqOoNTCJXA8FTm8kwshnBq", // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);


oauth2Client.setCredentials({
    refresh_token: "1//04rxD_Qt-l-jJCgYIARAAGAQSNwF-L9Ir9QVsMkshIaCZGuCkO8RnVKUmcQErERZ36-hF7EWqCvABcCraf0mlsuCveCPg5cs-rqc"
});
const accessToken = oauth2Client.getAccessToken()


const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
         type: "OAuth2",
         user: "farmmanagerproject2020@gmail.com", 
         clientId: "652990461052-q7se5turtkrcki9knfbsv9ps7lhcqsok.apps.googleusercontent.com",
         clientSecret: "DhGqOoNTCJXA8FTm8kwshnBq",
         refreshToken: "1//04rxD_Qt-l-jJCgYIARAAGAQSNwF-L9Ir9QVsMkshIaCZGuCkO8RnVKUmcQErERZ36-hF7EWqCvABcCraf0mlsuCveCPg5cs-rqc",
         accessToken: accessToken
    }
});

async function mailSender(email, activities){
    return new Promise(async (resolve, reject) =>{
        const mailOptions = {
            from: "farmmanagerproject2020@gmail.com",
            to: email,
            subject: "Upcoming activities",
            generateTextFromHTML: true,
            html: "<h1>Dear User.</h1></br>" +
                "<h3>You set that we inform you about upcoming activites.</h3>" +
                `<h4>Upcoming: ${activities}</h4>`
        };
        
        smtpTransport.sendMail(mailOptions, (error, response) => {

            if(error){
                reject(error)
            }
            resolve(response)
            smtpTransport.close();
        });
    })   
}
async function PasswordReset(email, token){
    return new Promise(async (resolve, reject) =>{
        console.log("usao u send", email, token);
        const mailOptions = {
            from: "farmmanagerproject2020@gmail.com",
            to: email,
            subject: "Password reset",
            generateTextFromHTML: true,
            html: "<h1>Dear User.</h1></br>" +
                "<h3>You requested password reset, following link is valid for the next hour.</h3>" +
                `<h4>http://localhost:8080/#/passwordreset/${token}</h4>`
        };
        
        smtpTransport.sendMail(mailOptions, (error, response) => {

            if(error){
                reject(error)
            }
            resolve(response)
            smtpTransport.close();
        });
    })   
}

// export{mailSender, PasswordReset}
