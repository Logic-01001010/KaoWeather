var express = require('express');

const request = require('request');
const cheerio = require('cheerio');
const { json } = require('body-parser');

var app = express();




const crawl = () => {
    

    const options = {
        encoding: "utf-8",
        method: "GET",
        uri: "http://api.openweathermap.org/data/2.5/weather?q=Seoul&appid={YOUR-API}"
    }




    return new Promise(function(resolve, reject){
        response = request(options, async function(err,res,html){

            
            result = JSON.parse(html);

            resolve(result.name);
        })
    
        
    });
    
};






app.get('/', async (req, res) => {

    const result = await crawl();

    res.send(result);
});




var server = app.listen(4000, ()=>{
    console.log("Server On at 4000");
})


