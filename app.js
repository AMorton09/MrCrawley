const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const hbs = require('express-handlebars');
const app     = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let scrape = (url) => {
    request(url, (error, response, html) => {

        if(!error){


            let $ = cheerio.load(html);
            console.log("runs");



            let title, release, rating;
            const json = { title : "", release : "", rating : ""};

           // console.log($);

            $('.header').filter(function(){

                console.log("i ran");
                let data = $(this);

                title = data.children().first().text();

                release = data.children().last().children().text();

                json.title = title;
                json.release = release;



            });


            console.log("after");

        }
        else {
            console.log(error)
        }
    })
}

app.get('/',function (req, res) {
    res.render('home')
})



app.get('/scrape', function(req, res){


    let url = 'http://www.imdb.com/title/tt1229340/';

    scrape(url);

    res.render('test')
});

app.listen('8080');

console.log('IM ALIVE!!! i think at least maybe sorta kinda yea its working');

exports = module.exports = app;
