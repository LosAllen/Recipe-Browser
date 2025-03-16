import express from 'express';
import passport from '../middlewares/auth.js';// Import the passport object

const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        if (req.isAuthenticated()) {
            res.redirect('/api-docs');
        } else {
            res.redirect('/');
        }
    }
);

export default router;