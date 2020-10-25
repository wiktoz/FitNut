const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/healthApp', { useUnifiedTopology: true, useNewUrlParser: true });

var Product = require('./../models/product.js');

var products = [
    new Product({
        name:"Banany",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:88,
            kJ:368,
            fats:0.3,
            carbohydrates:23,
            sugars:12,
            fibers:2.6,
            proteins:1.1,
            sodium:0.001,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Jabłka",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:52,
            kJ:218,
            fats:0.2,
            carbohydrates:14,
            sugars:10,
            fibers:2.4,
            proteins:0.3,
            sodium:0.001,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Makaron",
        weight:100,
        vegetarian:true,
        glutenFree:false,
        nutritionalValues:{
            kcal:131,
            kJ:548,
            fats:1.1,
            carbohydrates:25,
            sugars:0,
            fibers:0,
            proteins:5,
            sodium:0.006,
            cholesterol:0.033,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Kasza gryczana",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:343,
            kJ:1435,
            fats:3.4,
            carbohydrates:72,
            sugars:0,
            fibers:10,
            proteins:13,
            sodium:0.001,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Frytki",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:323,
            kJ:1351,
            fats:15,
            carbohydrates:43,
            sugars:0.2,
            fibers:3.9,
            proteins:3.4,
            sodium:0.189,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Ryż",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:360,
            kJ:1506,
            fats:0.6,
            carbohydrates:79,
            sugars:0,
            fibers:1.4,
            proteins:6.6,
            sodium:0.001,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Chipsy",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:532,
            kJ:2226,
            fats:34,
            carbohydrates:54,
            sugars:0.3,
            fibers:3.1,
            proteins:6.4,
            sodium:0.527,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Masło",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:717,
            kJ:3000,
            fats:81,
            carbohydrates:0.1,
            sugars:0.1,
            fibers:0,
            proteins:0.9,
            sodium:0.643,
            cholesterol:0.215,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Pieczone mięso z kurczaka",
        weight:100,
        vegetarian:false,
        glutenFree:true,
        nutritionalValues:{
            kcal:111,
            kJ:464,
            fats:2.7,
            carbohydrates:0,
            sugars:0,
            fibers:0,
            proteins:20,
            sodium:0.075,
            cholesterol:0.065,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Hamburger",
        weight:100,
        vegetarian:false,
        glutenFree:false,
        nutritionalValues:{
            kcal:264,
            kJ:1105,
            fats:10,
            carbohydrates:30,
            sugars:6,
            fibers:1.3,
            proteins:13,
            sodium:0.494,
            cholesterol:0.027,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Truskawki",
        weight:100,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:32,
            kJ:134,
            fats:0.3,
            carbohydrates:7.7,
            sugars:4.9,
            fibers:2,
            proteins:0.7,
            sodium:0.001,
            cholesterol:0,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Kawa",
        weight:100,
        drink:true,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:0,
            kJ:0,
            fats:0,
            carbohydrates:0,
            sugars:0,
            fibers:0,
            proteins:0,
            sodium:0.002,
            cholesterol:0,
            caffeine:0.040
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Cola",
        weight:500,
        drink:true,
        vegetarian:true,
        glutenFree:true,
        nutritionalValues:{
            kcal:197,
            kJ:824,
            fats:0,
            carbohydrates:55,
            sugars:55,
            fibers:2,
            proteins:0.7,
            sodium:0.063,
            cholesterol:0,
            caffeine: 0.048
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Czekolada mleczna",
        weight:100,
        vegetarian:true,
        glutenFree:false,
        nutritionalValues:{
            kcal:535,
            kJ:2238,
            fats:30,
            carbohydrates:59,
            sugars:52,
            fibers:3.4,
            proteins:7.7,
            sodium:0.079,
            cholesterol:0.023,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Pieczona wołowina",
        weight:100,
        vegetarian:false,
        glutenFree:true,
        nutritionalValues:{
            kcal:271,
            kJ:1133,
            fats:17.8,
            carbohydrates:0,
            sugars:0,
            fibers:0,
            proteins:25.8,
            sodium:0.075,
            cholesterol:0.091,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
    new Product({
        name:"Pieczona wieprzowina",
        weight:100,
        vegetarian:false,
        glutenFree:true,
        nutritionalValues:{
            kcal:164,
            kJ:686,
            fats:4.8,
            carbohydrates:0,
            sugars:0,
            fibers:0,
            proteins:28.1,
            sodium:0.056,
            cholesterol:0.079,
            caffeine:0
        }
    }).save(function(err){
        if(err) console.log(err);
    }),
];