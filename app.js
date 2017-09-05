var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var hbs = require('express-handlebars');
var app     = express();

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



app.get('/',function (req, res) {
    res.render('home')
})



app.get('/scrape', function(req, res){

    // The URL we will scrape from - in our example Anchorman 2.

    url = 'http://www.imdb.com/title/tt1229340/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            const $ = cheerio.load(html);


            // Finally, we'll define the variables we're going to capture

            var title, release, rating;
            const json = { title : "", release : "", rating : ""};


            $('.header').filter(function(){
                console.log("i rsn");
                var data = $(this);

                title = data.children().first().text();

                release = data.children().last().children().text();

                json.title = title;
                json.release = release;



            });



            res.render('test',json)
        }
        else {
            console.log(error)
        }
    })

});

app.listen('8080');

console.log('IM ALIVE!!! i think at least maybe sorta kinda yea its working');

exports = module.exports = app;
