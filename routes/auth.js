// routes/auth.js
import express from 'express';
import passport from 'passport';

const router = express.Router();

// GitHub login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    const githubId = req.user.githubId;
    res.redirect(`/index.html?githubId=${githubId}`);
  }
);

// Get current user info
router.get('/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Logout
router.get('/auth/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie('connect.sid', {
        path: '/',
        sameSite: 'none',
        secure: true,
      });
      res.redirect('/index.html');
    });
  });
});


export default router;