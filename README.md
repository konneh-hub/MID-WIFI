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
   - Admin dashboard: http://localhost:5002/admin

## Firebase Hosting + Cloud Run Backend

The frontend is deployed to Firebase Hosting. To deploy the backend, use Cloud Run and expose the Express app from `server/`.

### Recommended deployment scripts

Use the repository helpers from the project root:

- `./deploy-frontend.sh` or `./deploy-frontend.ps1` — build and deploy the frontend to Firebase Hosting
- `./deploy-backend.sh` or `./deploy-backend.ps1` — build and deploy the backend to Cloud Run
- `./deploy-all.sh` or `./deploy-all.ps1` — run both frontend and backend deployment steps

### GitHub Actions CI/CD

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

The workflow requires these repository secrets:

- `GCP_SA_KEY` — Google Cloud service account JSON key
- `FIREBASE_SERVICE_ACCOUNT` — Firebase service account JSON key
- `MONGODB_URI` — production MongoDB connection string
- `SESSION_SECRET` — backend session encryption secret

### Manual backend deployment

1. Install and authenticate the Google Cloud SDK:
   ```bash
   gcloud auth login
   gcloud config set project mid-wifi
   ```

2. Build and push the backend container:
   ```bash
   cd server
   gcloud builds submit --tag gcr.io/mid-wifi/midwifery-backend
   ```

3. Deploy the backend to Cloud Run:
   ```bash
   gcloud run deploy midwifery-backend \
     --image gcr.io/mid-wifi/midwifery-backend \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --set-env-vars MONGODB_URI="your-mongodb-uri",SESSION_SECRET="your-session-secret",CLIENT_URL="https://mid-wifi.web.app"
   ```

4. Update `client/.env.production` or `VITE_API_BASE` to use the Cloud Run service URL:
   ```bash
   VITE_API_BASE=https://<your-cloud-run-url>/api
   ```

5. Redeploy frontend after updating production API config:
   ```bash
   cd client
   npm run build
   firebase deploy --only hosting --project mid-wifi
   ```

## Notes

- The public React site consumes API endpoints from the backend.
- The admin system is rendered by Express/EJS and lives under `/admin`.
- A default admin user can be seeded using the `seed` script.

## Default admin

- Email: `admin@midwifery.edu`
- Password: `MidWifery123!`
