const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch(e) {
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const userData = req.body;
        const user = new User(userData);
        await user.save();
        return res.send(user);
    } catch(e) {
        next(e);
    }
});

module.exports = router;
