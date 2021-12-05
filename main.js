const express = require('express');
const path = require('path');
const Cryptr = require('cryptr');
const app = express();

app.use(express.urlencoded({extended: false}))
express.static(path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('main.ejs')
})

app.post('/encrypt', (req, res) => {
    const {decrypted, secret} = req.body;
    const EnCrypter = new Cryptr(secret)

    const encrypted = EnCrypter.encrypt(decrypted);
    res.render('result.ejs', {encrypted: encrypted, token: secret});
})

app.post('/decrypt', (req, res) => {
    const {encrypted, secret} = req.body;
    const EnCrypter = new Cryptr(secret)

    const decrypted = EnCrypter.decrypt(encrypted);
    res.render('result.ejs', {encrypted: decrypted, token: secret});
})

app.listen(8080, () => console.log('listening on port'));