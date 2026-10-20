# Healix Project Setup & Optimization Guide

## 🚀 Quick Start

### Backend Setup

Open a terminal in the project root and run:

```bash
cd backend
npm install
npm run dev
```

Backend server: `http://localhost:3000`

### Frontend Setup

Open a **separate terminal** in the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5174`

> **Note:** This guide assumes the frontend directory is named `frontend`. If your project uses `curo-frontend`, replace `frontend` with `curo-frontend` in the commands above and in the production build instructions below.

---

## 📋 Feature Status and Required Configuration

### ✅ Features That May Work Without Additional External API Keys

These features still require the appropriate database, Firebase configuration, and dependencies where applicable.

#### 1. Medicine Reminder
- **Status:** Core functionality available when configured.
- **Database:** Supabase.
- **External API keys:** No additional third-party API key required for basic functionality.
- **Requirements:** Correct database configuration and a working reminder scheduler.

#### 2. Health Records
- **Status:** Core functionality available when configured.
- **Database:** Supabase.
- **Features:** Health record management and file uploads.
- **External API keys:** No additional third-party API key required beyond the configured services.

#### 3. Medicine Price Comparison
- **Status:** Depends on the availability and compatibility of the external pharmacy sources.
- **Sources:** PharmEasy, Tata 1mg, and Apollo Pharmacy.
- **Features:** Medicine search and price comparison.
- **Note:** External websites and APIs may change their responses, impose restrictions, or become temporarily unavailable.

#### 4. Insurance Premium Predictor
- **Status:** Available when the local model and its dependencies are configured correctly.
- **Models:** Locally available machine-learning models, including LightGBM/ONNX where implemented.
- **External API keys:** Not required for local inference.

---

### ⚠️ Features Requiring Additional API Configuration

#### 1. MediChat AI Doctor

**Required environment variables:**
- `GROQ_API_KEY` — LLM inference.
- `TAVILY_API_KEY` — Web search.
- `PINECONE_API_KEY` — Vector database access.
- `PINECONE_INDEX` — Pinecone index name.

**Setup:**
1. Get a Groq API key from [Groq Console](https://console.groq.com/).
2. Get a Tavily API key from [Tavily](https://tavily.com/).
3. Create and configure an index through [Pinecone](https://www.pinecone.io/).
4. Add the credentials to `backend/.env`.
5. Restart the backend and verify the feature status.

> **Important:** MediChat is an AI assistant and should not replace professional medical advice or emergency care.

#### 2. Nearby Services

**Required environment variable:**
- `GOOGLE_MAPS_API_KEY`

**Setup:**
1. Open the [Google Maps Platform](https://console.cloud.google.com/).
2. Create or select a Google Cloud project.
3. Enable the Google Maps Platform APIs required by your implementation, such as Places API.
4. Create an API key and restrict it appropriately.
5. Add the key to `backend/.env`.

#### 3. Appointment Booking

**Required environment variables:**
- `NEXHEALTH_API_KEY`
- `NEXHEALTH_SUBDOMAIN`
- `NEXHEALTH_LOCATION_ID`

**Setup:**
1. Visit [NexHealth](https://nexhealth.com/).
2. Obtain the required API credentials and location details.
3. Add the credentials to `backend/.env`.
4. Restart the backend and test the appointment workflow.

Actual booking availability depends on the NexHealth account, supported endpoints, and valid provider/location configuration.

---

## 🗄️ Database Setup

### Configure Supabase

1. Open your project in the [Supabase Dashboard](https://supabase.com/dashboard).
2. Navigate to **SQL Editor**.
3. Create a new SQL query.
4. Copy the contents of `backend/supabase_schema.sql`.
5. Execute the SQL and verify that the required tables and policies have been created.

The schema may include:

- `users`
- `health_records`
- `medicine_reminders`
- `appointments`
- Row-Level Security (RLS) policies

> The exact tables and policies depend on the schema file in your repository. Review that file before running it, especially if the database already contains production data.

### Security Notes

- Never commit your Supabase service-role key to GitHub.
- Keep private backend credentials in `backend/.env`.
- Enable appropriate Row-Level Security policies.
- Use the least-privileged credentials and permissions supported by your implementation.

---

## 📊 Check Feature Status

If the backend implements the feature-status endpoint, run:

```bash
curl http://localhost:3000/api/features-status
```

Example response:

```json
{
  "features": {
    "medichat": {
      "enabled": false,
      "message": "Missing GROQ_API_KEY"
    },
    "nearbyServices": {
      "enabled": false,
      "message": "Missing GOOGLE_MAPS_API_KEY"
    },
    "appointments": {
      "enabled": false,
      "message": "Missing NexHealth credentials"
    },
    "medicineReminder": {
      "enabled": true,
      "message": "Ready"
    },
    "healthRecords": {
      "enabled": true,
      "message": "Ready"
    },
    "medicinePrice": {
      "enabled": true,
      "message": "Ready"
    },
    "premiumPredictor": {
      "enabled": true,
      "message": "Ready"
    }
  }
}
```

The response above is an **illustrative example**. Actual results depend on your environment variables, database connectivity, implementation, and external service availability.

---

## ⚡ Performance Optimizations

### Frontend

The project may include the following optimizations, depending on the current implementation:

- Route-based code splitting and lazy loading.
- Vite production build optimizations.
- Minification and JavaScript chunk splitting.
- Vendor-library chunk configuration.
- API proxy configuration for local development.

### Backend

Potentially implemented optimizations include:

- CORS configuration.
- Parallel requests for medicine searches.
- Database connection reuse or pooling.
- Centralized error handling.
- Graceful handling of unavailable external services.

> These are documentation notes, not independent verification of every optimization. Confirm them against the current source code and configuration before treating them as completed features.

---

## 🛠️ Environment Variables

Create a `.env` file inside the `backend/` directory.

```env
PORT=3000

# Supabase - required
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Firebase - configure according to the backend implementation
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_firebase_sender_id
FIREBASE_APP_ID=your_firebase_app_id

# MediChat - optional external services
GROQ_API_KEY=
TAVILY_API_KEY=
PINECONE_API_KEY=
PINECONE_INDEX=

# Nearby services - optional
GOOGLE_MAPS_API_KEY=

# Appointment booking - optional
NEXHEALTH_API_KEY=
NEXHEALTH_SUBDOMAIN=
NEXHEALTH_LOCATION_ID=
```

### Environment Configuration Guidelines

- Replace placeholders with the actual credentials for your own projects.
- Do not use `dummy` values as if they were valid API keys.
- If an optional feature is not being used, leave its credentials unset only if the application supports missing configuration.
- Check the source code and `.env.example` file for any additional required variables.
- Keep `.env` files out of version control by adding them to `.gitignore`.

**Never publish private API keys, service-role keys, access tokens, or Firebase service-account private keys.**

---

## 🔧 Troubleshooting

### 1. Port Already in Use

Find the process using port `3000` on Windows:

```cmd
netstat -ano | findstr :3000
```

Stop the process only if you have confirmed that it is safe to do so:

```cmd
taskkill /PID <PID> /F
```

Replace `<PID>` with the actual process ID.

### 2. Supabase Connection Failed

- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY`.
- Confirm that the required tables exist.
- Check database permissions and RLS policies.
- Review the backend logs for connection errors.
- Check network connectivity.

### 3. Firebase Authentication Issues

- Verify the Firebase project configuration.
- Confirm that the required authentication provider is enabled.
- Check the browser console and backend logs.
- Verify that the frontend and backend use the intended Firebase project.

### 4. Medicine Reminder Not Working

- Verify the database schema and user records.
- Check that the reminder scheduler starts successfully.
- Confirm that reminder times and time zones are handled correctly.
- Verify that the user's FCM token is registered if push notifications are used.
- Review backend logs for scheduler or notification errors.

### 5. Optional Features Not Working

- Verify that all required credentials are present.
- Check whether the provider's API is enabled and accessible.
- Confirm that the API key has the necessary permissions.
- Inspect the backend logs and feature-status endpoint.
- Restart the backend after changing environment variables.

---

## 📦 Building for Production

### Frontend

Run these commands from the project root:

```bash
cd frontend
npm install
npm run build
npm run preview
```

The preview server is intended for checking the production build locally, not as a complete production deployment.

### Backend

```bash
cd backend
npm install
node index.js
```

For deployment, configure the production environment variables and use the appropriate process manager or hosting platform. If the project defines a production start script, use the command specified in `backend/package.json`.

> `npm install --production` is deprecated in newer npm versions. If you need production-only dependencies, use `npm ci --omit=dev` when a compatible lockfile is available.

---

## 🎯 Feature Completeness Overview

| Feature | External API configuration | Notes |
|---|---|---|
| Medicine Reminder | No additional third-party API key for basic functionality | Requires database and scheduler configuration |
| Health Records | No additional third-party API key for basic functionality | Requires Supabase and storage configuration |
| Medicine Price Comparison | Depends on external pharmacy sources | Availability may vary |
| Insurance Premium Predictor | Not required for local inference | Requires model files and dependencies |
| MediChat AI Doctor | Groq, Tavily, and Pinecone | Requires valid credentials |
| Nearby Services | Google Maps Platform | Requires an enabled API and valid key |
| Appointment Booking | NexHealth | Requires valid account and location configuration |
| User Authentication | Firebase configuration | Requires a configured Firebase project |
| Push Notifications | Firebase Cloud Messaging configuration | Requires correct tokens and notification setup |

This table describes the expected configuration. Verify actual functionality in the running application before marking every feature as complete.

---

## 🚀 Enabling All Features

1. Obtain credentials for Groq, Tavily, Pinecone, Google Maps Platform, and NexHealth.
2. Configure the required variables in `backend/.env`.
3. Verify Supabase and Firebase configuration.
4. Restart the backend:

   ```bash
   cd backend
   npm run dev
   ```

5. Check the feature-status endpoint:

   ```bash
   curl http://localhost:3000/api/features-status
   ```

6. Test each feature in the frontend and review the backend logs for errors.

---

## 📞 Support and Debugging

If you encounter an issue:

1. Check `/api/features-status`, if implemented.
2. Review the backend terminal logs.
3. Check the browser's developer console.
4. Verify environment variables and database configuration.
5. Confirm that external services and APIs are available.
6. Check the project's `README.md` and package scripts for additional setup instructions.

**Security reminder:** Never share a real `.env` file or publish private credentials in GitHub issues, screenshots, or project documentation.
