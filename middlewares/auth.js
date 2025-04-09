import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';
import User from '../models/user.js'; // Make sure the path is correct

dotenv.config();

// Configure GitHub OAuth Strategy
passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:8080/users/auth/github/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("GitHub profile received:", profile.id, profile.username);
  
          let user = await User.findOne({ githubId: profile.id });
          console.log("Found existing user?", user ? "YES" : "NO");
  
          if (!user) {
            user = await User.create({
              githubId: profile.id,
              username: profile.username,
              avatar: profile.photos?.[0]?.value || null
            });
            console.log("✅ Created new user:", user);
          }
  
          return done(null, user);
        } catch (err) {
          console.error("❌ GitHub strategy failed:", err); // <---- important
          return done(err, null);
        }
      }
    )
  );

// Serialize GitHub ID
passport.serializeUser((user, done) => {
    done(null, user.githubId); // ✅ Store GitHub ID
  });
  
  // Deserialize using githubId
  passport.deserializeUser(async (githubId, done) => {
    try {
      const user = await User.findOne({ githubId }); // ✅ Lookup by GitHub ID
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

// Middleware to initialize Passport
export const initializePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

// Middleware to check if user is authenticated
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Authentication required' });
};

export default passport;