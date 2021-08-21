const catchAsync = require("../utils/catchAsync");
const foodData = require("../models/foodModel");

exports.getAllFoods = catchAsync(async(req,res,next)=>{
    
    const foods = await foodData.find().populate('userInfo');
    res.status(200).json({
        status:'success',
        results: foods.length,
        data:{
            foods
        }
    });
});

exports.createFood = catchAsync(async(req,res,next)=>{

    const newFood = await foodData.create(req.body);

    res.status(200).json({
        status:'success',
        data:{
            food:newFood
        }
    });
});

exports.deleteFood = catchAsync(async(req,res,next)=>{

       const delFood =  await foodData.findByIdAndDelete(req.params.id);
       if(!delFood)
       {
           return next(new AppError('No food found with that ID', 404));
       }
        res.send("Done");
        
});