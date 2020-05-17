const express = require('express')
const {Activity} = require('../db/models/activity.js')
const moment = require('moment')
const PdfPrinter = require('pdfmake')

const PDFRoute = new express.Router()


PDFRoute.get('/api/pdf', async (req, res) =>{

    const allActivities = await Activity.find({ 
        $and: [
            {scheduledAt: {$gt: req.query.from}},
            {scheduledAt: {$lt: req.query.to}}
        ]
    })
    const sum = allActivities.reduce((a, {expense}) => a + expense, 0);
    var fonts = {
        Roboto: {
            normal: __dirname + '/../fonts/Roboto-Regular.ttf',
            bold: __dirname + '/../fonts/Roboto-Medium.ttf',
            italics: __dirname + '/../fonts/Roboto-Italic.ttf',
            bolditalics: __dirname + '/../fonts/Roboto-MediumItalic.ttf'
        }
    };
    var printer = new PdfPrinter(fonts);
    var body= [
        [
            [{text: 'Description', fontSize: 20}], [{text: 'Expense', fontSize: 20}]
        ]
    ]
    var docDefinition = {
        content: [
            {
                text:[
                    { text: "Report on the day ",fontSize: 25},
                    {text: moment().format("Do MMM YYYY"), fontSize: 25, color: '#fc5185', bold: true}
                ],                
                margin: [0, 30]
            },
            {
                table: {
                    widths: [300, 200],
                    body
                }
            },
            {
                text:[
                    {text: "Total sum: ", fontSize: 25},
                    {text: sum, fontSize: 25, color: '#fc5185', bold: true}
                ],
                margin:[0, 20, 0, 0]
            },
        ]
    };
    allActivities.forEach(({description, expense}) => {
        body.push([[description], [expense]])
    });
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(res)
    pdfDoc.end();
    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=out.pdf'
    });
})

module.exports = PDFRoute