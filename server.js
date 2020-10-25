const express = require('express');
const pug = require('pug');
const path = require('path');
const fs = require('fs');
const app = express();
const options = {
  key: fs.readFileSync('/etc/ssl/private/key-fitnut.pem'),
  cert: fs.readFileSync('/etc/ssl/certs/cert-fitnut.pem')
};
const https = require('https').createServer(options, app);
const io = require('socket.io')(https);
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const port = 8001;
const mainRoutes = require('./routes/mainRoutes.js');
mongoose.connect('mongodb://localhost:27017/healthApp', { useUnifiedTopology: true, useNewUrlParser: true });
var Product = require('./models/product.js');

var userNumber = 0;

app.use(cookieParser());
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public")));
app.use('/', mainRoutes);

io.on('connection', (socket) => {
    io.emit('userNumber', userNumber+=1);
    
    socket.on('renderItems',(pickedItems)=>{
        Product.find({_id:{$in:pickedItems}}).sort({name:1}).exec(function(err,result){
            var picked = result;
            
            Product.find({}).sort({name:1}).exec(function(err,result){
                var all = result;
                io.emit('rendered', all, picked);
            });
        });
    });
    
    socket.on('search', (text)=> {
        var phrase = text.replace(/[^a-z0-9\ ]/gi,'');
        Product.find({name:{'$regex': phrase, '$options': 'i'}}).sort({name:1}).exec(function(err,result){
            io.emit('found', result);
        });
    });
    
    socket.on('disconnect', function(){
       io.emit('userNumber', userNumber-=1);
    });
});

https.listen(port, '0.0.0.0',() => {
  console.log('Listening on port '+port);
});