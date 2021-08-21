const express = require('express');
const userRouter = require('./routes/userRoutes')
const foodRouter = require('./routes/foodRoutes')
// const { reset } = require('nodemon');
const app = express();
// 1) MIDDLEWARES
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next)=>{
console.log(req.headers);
next();
});
// 3) ROUTES
app.use('/api/v1/tl/users',userRouter);
app.use('/api/v1/tl/foods',foodRouter);

// ERROR DETECTOR
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    console.log(err.message);
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

module.exports = app;