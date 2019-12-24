const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {
        type: String,
        trim: true,
        required: [true, 'Please provide your e-mail.'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please provide a password.'],
        minlength: 8,
        select: false
    },
    links: [{type: Types.ObjectId, ref: 'Link'}]
});

module.exports = model('User', schema);
