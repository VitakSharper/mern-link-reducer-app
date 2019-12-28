const {promisify} = require('util');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
    return jwt.sign({id}, config.get('jwtSecret'), {expiresIn: config.get('jwtExpiresIn')});
};

exports.signin = catchAsync(async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }

    const user = await User.findOne({email}).select('+password');
    if (!user || !await user.checkPwd(password, user.password)) {
        return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
});

exports.signup = catchAsync(async (req, res, next) => {
    const {email, password, passwordConfirm} = req.body;
    const newUser = await User.create({email, password, passwordConfirm});

    const token = signToken(newUser._id);

    res.status(201).json({
        status: 'success',
        token,
        user: newUser
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    const decoded = await promisify(jwt.verify)(token, config.get('jwtSecret'));
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
        return next(
            new AppError('The user belonging to this token does no longer exist.', 401)
        );
    }
    req.user = currentUser;
    next();
});
