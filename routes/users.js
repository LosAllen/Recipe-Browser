import express from 'express';
import passport from '../middlewares/auth.js';

const router = express.Router();

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/api-docs');
    }
);

export default router; 