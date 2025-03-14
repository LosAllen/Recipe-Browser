const express = require('express');
const passport = require('../middlewares/auth');
const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

module.exports = router;
