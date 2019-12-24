const {Schema, model, Types} = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const schema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide your e-mail.'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid e-mail.']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a password.'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password.'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Password are not the same.'
        }
    }
    // links: [{type: Types.ObjectId, ref: 'Link'}]
});

schema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
});

schema.methods.checkPwd = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = model('User', schema);
