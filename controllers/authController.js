const {promisify} = require('util');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');

const signToken = id => {
    return jwt.sign({id}, config.get('jwt_secret'), {expiresIn: config.get('jwt_expires_in')});
};

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json({message: 'Please provide email and password!'})
    }

    const user = await User.findOne({email}).select('+password');
    if (!user || !await user.checkPwd(password, user.password)) {
        return res.status(401).json({message: 'Incorrect email or password.'})
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
};

exports.signup = async (req, res, next) => {
    try {
        const {email, password, passwordConfirm} = req.body;
        const newUser = await User.create({email, password, passwordConfirm});

        const token = signToken(newUser._id);

        res.status(201).json({
            status: 'success',
            token,
            user: newUser
        });
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
};

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401).json({
            message: 'You are not logged in.'
        })
    }

    const decoded = await promisify(jwt.verify)(token, config.get('jwt_secret'));
    next();
};
