const {Router} = require('express');
const Link = require('../models/Link');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const router = Router();


router.get('/:code', catchAsync(async (req, res, next) => {
    const link = await Link.findOne({code: req.params.code});

    if (link) {
        link.clicks++;
        await link.save();
        return res.redirect(link.from)
    }

    return next(
        new AppError('Link not found.', 404)
    )
}));

module.exports = router;
