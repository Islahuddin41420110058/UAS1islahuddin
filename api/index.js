var express = require('express');
var r = express.Router();

// load pre-trained model
const model = require('./sdk/model.js');

// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '1862592505:AAFQqYeBnvp0ezz0p5PIf95le9225S4De4E'
const bot = new TelegramBot(token, {polling: true});


// bots
bot.onText(/\/start/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `hello ${msg.chat.first_name}, welcome...\n
        Selamat datang di bot islahuddin
        click /predict`
    );   
});

state = 0
bot.onText(/\/predict/, (msg) => { 
    console.log(msg)
    bot.sendMessage(
        msg.chat.id,
        `input nilai X|Y|Z contohnya 8|15|-270`
    );   
    state = 1
});

bot.on('message', (msg) => {
    if(state == 1){
        s = msg.text.split("|");
        X = s [0]
        M1 = s [1]
        model.predict(
            [
                parseFloat(s[2]), // string to float
                parseFloat(s[3]),
                parseFloat(s[4])
            ]
        ).then((jres)=>{
            console.log(jres);
            bot.sendMessage(
                msg.chat.id,
                `nilai X yang diprediksi adalah ${jres [2]} `
                
            ); 
            bot.sendMessage(
                msg.chat.id,
                `nilai Y yang diprediksi adalah ${jres [3]} `
            );
             bot.sendMessage(
                msg.chat.id,
                `nilai Z yang diprediksi adalah ${jres [4]} `
            );
        })
    }else{
        state = 0
    }
})
// routers
r.get('/prediction/:X/:Y/:Z', function(req, res, next) {    
    model.predict(
        [
            parseFloat(req.params.X), // string to float
            parseFloat(req.params.Y),
            parseFloat(req.params.Z),
        ]
    ).then((jres)=>{
        res.json(jres);
    })
});

module.exports = r;
