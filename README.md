# Recipe Browser API

A full-stack Node.js application that allows users to browse, create, comment on, and manage recipes. Built by John Trok and Lincoln Allen for the CSE 341 final project.

## Live Links

- Live App: https://recipe-browser-yk8s.onrender.com
- Swagger Docs: https://recipe-browser-yk8s.onrender.com/api-docs
- GitHub Repo: https://github.com/Jonathant4242/Recipe-Browser
- YouTube Demo: (https://youtu.be/HEc7IeZJ3Nk)

## Features

- GitHub OAuth authentication using Passport.js
- RESTful API with GET, POST, PUT, and DELETE support
- MongoDB storage for recipes and comments
- User-authenticated actions for recipe creation and commenting
- Session management using cookies and Express sessions
- Swagger documentation for all API routes
- Frontend interface with recipe cards and dynamic views
- Input validation and error handling
- Unit testing with Jest
- Full deployment to Render

## Project Structure

```
/project-root
├── public/               # Frontend (HTML, CSS, JS)
├── routes/               # Express route handlers
├── models/               # Mongoose schemas
├── controllers/          # Business logic
├── middlewares/          # Auth and validation
├── tests/                # Unit tests
├── config/               # Swagger setup
├── index.js              # Server entry point
├── .env                  # Environment variables
```

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- GitHub OAuth with Passport.js
- Swagger for API docs
- Jest for unit testing
- Render for deployment
- Vanilla JS, HTML, and CSS for frontend

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Jonathant4242/Recipe-Browser.git
cd Recipe-Browser
npm install
```

2. Create a `.env` file with the following variables:
```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:8080/users/auth/github/callback
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=8080
```

3. Start the server:
```bash
npm start
```

4. Visit http://localhost:8080 in your browser.

## API Endpoints Summary

| Method | Route                   | Description                            |
|--------|-------------------------|----------------------------------------|
| GET    | /recipes                | Retrieve all recipes                   |
| POST   | /recipes                | Create a recipe (requires auth)        |
| GET    | /recipes/:id            | Get recipe by ID                       |
| PUT    | /recipes/:id            | Update recipe by ID (requires auth)    |
| DELETE | /recipes/:id            | Delete recipe by ID (requires auth)    |
| POST   | /recipes/:id/comments   | Add a comment to a recipe (auth req.)  |
| GET    | /categories             | Fetch all recipe categories            |
| GET    | /users/me               | Get current authenticated user         |

See full API documentation at: https://recipe-browser-yk8s.onrender.com/api-docs

## Team Members

- John Trok - https://github.com/Jonathant4242
- Lincoln Allen - https://github.com/LosAllen

## License

This project was created for educational use in CSE 341 at BYU-Idaho.
