const User = require('../models/User');

exports.login = async (req, res, next) => {

};

exports.signup = async (req, res) => {
    try {
        const {email, password} = req.body;

        const candidateMail = await User.findOne({email});
        if (candidateMail) {
            return res.status(400).json({
                message: 'User exists'
            })
        }

    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong!'
        })
    }
};
