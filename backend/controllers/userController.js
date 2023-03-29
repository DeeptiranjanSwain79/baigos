const User = require("../models/userModel");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
//Register a user
exports.registerUser = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;

    const user = await User.create({
        name, email, password
    });

    const token = user.getJWTToken();

    // res.status(201).json({
    //     success: true,
    //     message: "User created successfully",
    //     user
    // })
    sendToken(user, 201, res); 
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {

    //Taking email and password from the body
    const { email, password } = req.body;

    //Checking whether the user has given E-mail and password both or not
    if (!email || !password) {
        return next(new ErrorHandler("Please enter E-mail & Password", 400));
    }

    // If both E-mail and password received then find the user in the database
    const user = await User.findOne({ email }).select("+password");     //("+password") is written because while fetching the user we select all the values except the password but here for login we need password to login


    //If no user found
    if (!user) {
        new next(new ErrorHandler("Invalid Email or password", 401)); //401=> Unauthorised user
    }

    const isPasswordMatched = user.comparePassword(password);

    //If user found but password not matched
    if (!isPasswordMatched) {
        new next(new ErrorHandler("Invalid Email or password", 401));
    }

    // res.status(200).json({
    //     success: true,
    //     message: "Logged in successfully",
    //     user
    // })
    const token = user.getJWTToken();

    sendToken(user, 200, res);  
});


//Update user password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.body;
    const user = await User.findById(id).select("+password");

    if (!user) {
        return next(new ErrorHandler(`No user found with id: ${id}`, 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }

    user.password = req.body.newPassword;

    const updatedUser = await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully",
        user: updatedUser
    })
});