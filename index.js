const https = require('https');
const express = require('express');
const bodyparser = require("body-parser");
const { get } = require('http');
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = 3000;
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/search', (req, res) => {
    console.log(req.body.q)
    res.redirect(`https://www.google.com/search?q=${req.body.q}`)
});

app.get('/suggest/:q', (req, res) => {
    console.log(req.params.q)
    https.get(`https://www.google.com/complete/search?client=chrome&q=${req.params.q}`, (resp) => {
    let data = '';
    
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
        data += chunk;
    });
    
    // The whole response has been received.
    resp.on('end', () => {
        console.log(JSON.parse(data)[1]);
        res.send(JSON.parse(data)[1]);
    });
    
    }
    ).on("error", (err) => {
        console.log("Error: " + err.message);
    });
 

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))