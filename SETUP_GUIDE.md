# 🚀 Healix – Setup & Run Guide

## Prerequisites
- Node.js 16+
- Dependencies installed using `npm install` in both folders
- Configured Supabase and Firebase credentials

## 🗄️ Database Setup

1. Open the [Supabase Dashboard](https://supabase.com/dashboard).
2. Select your Healix project and open **SQL Editor**.
3. Copy the contents of `backend/supabase_schema.sql`.
4. Click **Run** to create the required tables and security policies.

## ▶️ Run the Project

Open two terminals from the project root.

**Terminal 1 – Backend**
```bash
cd backend
npm run dev
```
Backend: `http://localhost:3000`

**Terminal 2 – Frontend**
```bash
cd curo-frontend
npm run dev
```
Frontend: `http://localhost:5173` (or the next available port).

## ✅ Verification Checklist

- [ ] Backend starts without errors.
- [ ] Healix landing page opens successfully.
- [ ] Supabase tables are created.
- [ ] Medicine reminder scheduler runs correctly.
- [ ] No critical errors appear in the browser console.

## 🔧 Troubleshooting

| Issue | Solution |
|---|---|
| Table not found | Run `backend/supabase_schema.sql` in Supabase. |
| Port already in use | Stop the conflicting process or use another port. |
| Module not found | Run `npm install` in the affected folder. |
| Firebase authentication error | Verify Firebase configuration and credentials. |

## 🏥 Key Features

- Health Records Management
- Medicine Reminders
- MediChat AI Assistant
- Medicine Price Comparison
- Insurance Premium Predictor
- Nearby Healthcare Services
- Appointment Booking

**Note:** Features that depend on external APIs require valid credentials. Never commit `.env` files or private API keys to GitHub.

For additional details, refer to `README.md`.
