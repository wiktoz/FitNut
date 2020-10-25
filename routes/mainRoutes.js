const express = require('express');
const router = express.Router();
var Product = require('./../models/product.js');

router.get('/', (req, res, next) => {
    return res.render('start', { title: 'Start'});
});

router.get('/kalkulator', (req, res, next) => {
    if(!req.cookies.user || !req.cookies.max) return res.redirect('/');
    return res.render('index', { title: 'Kalkulator' });
});

module.exports = router;
