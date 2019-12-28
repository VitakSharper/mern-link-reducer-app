const Link = require('../models/Link');
const shortid = require('shortid');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const config = require('config');

exports.generate = catchAsync(async (req, res, next) => {
    const baseUrl = config.get('baseUrl');
    const {from} = req.body;
    const code = shortid.generate();

    const existing = await Link.findOne({from}).select('-__v');

    if (existing) {
        await res.json({
            link: existing
        });
        return next();
    }

    const to = `${baseUrl}/t/${code}`;
    const link = await Link.create({code, to, from, owner: req.user._id});

    res.status(201).json({link});
});

exports.links = catchAsync(async (req, res, next) => {
    const links = await Link.find({owner: req.user._id});


    await res.json(links);

});

exports.linkById = catchAsync(async (req, res, next) => {
    const link = await Link.findById(req.params.id);
    if (!link) {
        return next(
            new AppError('Link not found.', 404)
        )
    }
    await res.json(link)
});
