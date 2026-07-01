# Tivana
 
Tivana is a MERN stack social platform inspired by Instagram, but built specifically around sharing travel itineraries and experiences rather than single photos.
 
Instead of a single image post, each post is built around a **thumbnail cover image** followed by a series of additional images — each with its own description — letting users document a full trip step by step (e.g. a 5-day trekking journey, day by day).

## Features
- Create posts with:
  - A cover thumbnail
  - Multiple additional images, each with its own description
- Browse and view other users' trip posts
- Feed of posts from the platform

### Planned Features (Not Yet Available)
- Direct messaging
- Notifications
- Follow / following system

## Project Structure
```
.
├── backend
│   ├── config
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── multer.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── postController.js
│   │   └── userController.js
│   ├── middlewares
│   │   └── authMiddleware.js
│   ├── models
│   │   ├── CommentModel.js
│   │   ├── dropdownModel.js
│   │   ├── postModel.js
│   │   └── userModel.js
│   ├── package-lock.json
│   ├── package.json
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   └── userRoutes.js
│   ├── server.js
│   ├── utils
│   │   └── authValidate.js
│   └── vercel.json
└── frontend
    ├── eslint.config.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    │   ├── logo.png
    │   └── vite.svg
    ├── README.md
    ├── src
    │   ├── App.jsx
    │   ├── assets
    │   ├── components
    │   ├── context
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages
    ├── vercel.json
    └── vite.config.js
```

## This application is live at:
🔗 **Live:** [tivana.vercel.app](https://tivana.vercel.app)