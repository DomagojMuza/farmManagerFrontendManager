const axios = require('axios')
const cheerio = require('cheerio');


const vijesti = async (page)=>{
    const res = await axios.get(`https://www.euronews.com/tag/agriculture?p=${page}`)
    const $ = cheerio.load(res.data);
    const news = []

        $('article').each((index, element)=>{
            //slike
            let image = $(element).children('div').children('figure').children('a').children('img').attr('data-src');
            //title
            let title = $(element).children('div').last().children('.m-object__title').children('a').attr('title');
            //link
            let link = "https://www.euronews.com/" + $(element).children('div').last().children('.m-object__title').children('a').attr('href');
            //datum
            let postDate = $(element).children('div').last().children('.m-object__publishedAt').children('time').html();

            news[index] = {
                title, image, link, postDate
            }
        })
    return news
}

module.exports = vijesti
