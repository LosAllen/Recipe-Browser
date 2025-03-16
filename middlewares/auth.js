import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from 'dotenv';

dotenv.config();

// Configure GitHub OAuth Strategy
passport.use(new GitHubStrategy(
    {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:8080/users/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile); 
    }
));

// Serialize user (store only the user ID in session)
passport.serializeUser((user, done) => {
    done(null, user.id); // Store only user ID
});

// Deserialize user (retrieve from database if needed)
passport.deserializeUser((id, done) => {
    // TODO: Replace with actual DB lookup if needed
    done(null, { id }); // Return only the user ID for now
});

// Function to initialize passport middleware
export const initializePassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};

export default passport; // Fixes the incorrect named export