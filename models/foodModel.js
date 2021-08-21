const mongoose = require('mongoose');
const user = require('./userModel');

const foodSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'A food must have a name'],
            maxlength: [20, 'food name should be smaller'],
            minlength: [2, 'food name should atleast have 2 characters']
        
        },

        origin:{
            type:String,
        },
        flavour:{
            type:String,
            required:[true, 'A dish should have a flavour']
        },
        usersData:{
            type:String,
           
        }
    },
        {
            toJSON:{virtuals:true},
            toObject:{virtuals:true}
        }
    );

    // virtual populate
    foodSchema.virtual('userInfo',{
        ref:'User',
        foreignField:'name',
        localField:'usersData'
    });

    const foodData = mongoose.model('FoodData',foodSchema);
    
    module.exports = foodData;