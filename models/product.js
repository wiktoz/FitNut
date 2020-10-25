const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{type:String, required:true},
    weight:{type:Number, required:true},
    vegetarian:{type:Boolean, default:false},
    glutenFree:{type:Boolean, default:false},
    drink:{type:Boolean, default:false},
    
    nutritionalValues:{
        kcal:{type:Number},
        kJ:{type:Number},
        fats:{type:Number},
        carbohydrates:{type:Number},
        sugars:{type:Number},
        fibers:{type:Number},
        proteins:{type:Number},
        sodium:{type:Number},
        cholesterol:{type:Number},
        caffeine:{type:Number}
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Product', schema);