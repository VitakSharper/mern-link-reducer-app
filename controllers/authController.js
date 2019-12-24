const User = require('../models/User');

exports.login = async (req, res, next) => {

};

exports.signup = async (req, res, next) => {
    try {
        const {email, password, passwordConfirm} = req.body;

        const newUser = await User.create({email, password, passwordConfirm});

        res.status(201).json({
            status: 'success',
            user: newUser
        });
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
};
