# MIDWIFERY University Website System

A full-stack university website system with:
- React public website
- Node.js + Express API server
- MongoDB database with Mongoose
- Express/EJS admin dashboard (separate from React frontend)

## Project layout

- `client/` — React public website
- `server/` — Backend API and admin dashboard

## Setup

### Local Development

1. Install dependencies for backend:
   ```bash
   cd server
   npm install
   ```

2. Install dependencies for frontend:
   ```bash
   cd ../client
   npm install
   ```

3. Configure environment variables in `server/.env`.

4. Start development servers:
   ```bash
   cd server
   npm run dev
   ```

   In another terminal:
   ```bash
   cd client
   npm run dev
   ```

### Docker Setup

1. Ensure Docker and Docker Compose are installed.

2. Build and run the full stack:
   ```bash
   docker-compose up --build
   ```

   This will start:
   - MongoDB on port 27017
   - Backend API on port 4000
   - Frontend on port 3000

3. Access the application:
   - Public website: http://localhost:3000
   - Admin dashboard: http://localhost:4000/admin

## Notes

- The public React site consumes API endpoints from the backend.
- The admin system is rendered by Express/EJS and lives under `/admin`.
- A default admin user can be seeded using the `seed` script.

## Default admin

- Email: `admin@midwifi.edu`
- Password: `MidWifi123!`
