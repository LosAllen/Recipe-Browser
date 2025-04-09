import express from 'express';
import passport from 'passport';

const router = express.Router();

// GitHub login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log("✅ Authenticated, session should be set.");
    res.send(`
      <h1>GitHub Login Success</h1>
      <p>Session should now be set. Check cookies in dev tools.</p>
      <a href="/index.html">Go to Home</a>
    `);
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
      res.redirect('/index.html?logout=true');
    });
  });
});


export default router;