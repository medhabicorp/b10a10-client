# Hero Movies

Hero Movies is a web application designed to provide users with a seamless experience browsing and managing their favorite movies. Users can explore movie details, watch trailers, create custom movie lists, and manage their profiles.

## Purpose

The primary goal of this application is to create a platform for movie enthusiasts to discover, manage, and interact with their favorite movies. It aims to offer a user-friendly interface with dynamic features such as movie search, personalized recommendations, and social features, all while maintaining a modern, responsive design.

## Links and Info:

**Assignment Category:** Orchid (MOVIE PORTAL)

**GitHub Client Link:**[https://github.com/medhabicorp/b10a10-client](https://github.com/medhabicorp/b10a10-client)

**GitHub Server Link:** [https://github.com/medhabicorp/b10a10-server](https://github.com/medhabicorp/b10a10-server)

**Live Link:** [https://b10a10-hero-movie.web.app/](https://b10a10-hero-movie.web.app/)

## Key Features

- **User Authentication**: Register, login, and manage passwords securely with Firebase.
- **Movie Search**: Explore a wide range of movies by searching and filtering options.
- **Movie Management**: Create custom lists of favorite movies and view details like ratings, trailers, and reviews.
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS and DaisyUI.
- **Google Login**: Quick and easy login using Google authentication.
- **Profile Management**: Customize your profile and movie lists.
- **Notifications**: Get real-time notifications using React Hot Toast.
- **Backend Server**: MongoDB as the database for storing movie lists, user profiles, and other relevant data.
- **CORS Middleware**: CORS Express middleware used for handling cross-origin requests.

## NPM Packages Used

### Core Dependencies

- **react**: For building the UI components.
- **react-dom**: DOM rendering for React.
- **react-router-dom**: Manages client-side routing.
- **react-hook-form**: Simplifies form validation and handling.
- **firebase**: Provides backend services for user authentication and data storage.
- **react-hot-toast**: For showing notifications and alerts.
- **express**: Web framework for Node.js, used as the backend server.
- **mongoose**: ODM for MongoDB to handle database operations.
- **cors**: Express middleware for handling Cross-Origin Resource Sharing (CORS).

### UI and Styling

- **tailwindcss**: Utility-first CSS framework.
- **daisyui**: Tailwind component library for styled elements.

### Authentication

- **firebase**: Provides backend services for user authentication.

### Notifications

- **react-hot-toast**: For displaying user-friendly alerts and notifications.

### Build and Development Tools

- **vite**: Fast build tool and development server.

### Backend and Database

- **mongodb**: NoSQL database used to store user data and movie information.
- **express**: Web server for handling API routes and middleware.
- **cors**: Middleware for enabling cross-origin requests in Express. -**dotenv**: Installed dotenv and added server info into this

### Optional Utilities

- **prop-types**: Type-checking for props passed to components.

## Project Setup

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm create vite@latest hero-movies --template react
   npm install react-router-dom
   npm install react-hook-form firebase react-hot-toast sweetAlert2
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npm i -D daisyui@latest
   npm install express mongodb cors
   ```
