const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsync');

// exports.getAllTours = (req,res)=>{
//     res.status(200).json({
//         status:'Success',
//         name:'Sabarish'
//     });
// }

// exports.WriteTours = (req,res)=>{
    //     console.log(req.body);
    //     res.send('Done');
    // }
exports.getAllUsers = catchAsync( async(req,res)=>{
    
        const user = await User.find();
        res.status(200).json({
            status:'success',
            data:{
                user
            }
        });
     
});

// exports.createUsers = catchAsync(async (req,res)=>{
    
//         const newUser = await User.create(req.body);
//         res.status(201).json({
//             status:'success',
//             data:{
//                 user:newUser
//             }
//         });
    
// });

exports.createUsers = catchAsync(async (req, res) => {

    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined !'
    });

});