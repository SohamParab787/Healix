# 🎯 Healix – Feature Checklist & Configuration

## Available Features

| Feature | Status | Requirements |
|---|---|---|
| 🏥 Dashboard | ✅ Available | User login |
| 💊 Medicine Reminders | ✅ Available | Supabase, Firebase FCM |
| 📋 Health Records | ✅ Available | Supabase |
| 💊 Medicine Price Comparison | ✅ Available | External pharmacy sources |
| 📊 Insurance Premium Predictor | ✅ Available | Local ML models |
| 🤖 MediChat AI | ⚠️ Configuration required | Groq, Tavily, Pinecone |
| 📍 Nearby Healthcare Services | ⚠️ Configuration required | Google Maps API |
| 🗓️ Appointment Booking | ⚠️ Configuration required | NexHealth credentials |
| 👤 User Profile | ✅ Available | User login |
| 🔐 Authentication | ✅ Available | Firebase Authentication |

## ⚙️ Enable Optional Features

Add the required credentials to `backend/.env`:

- **MediChat:** `GROQ_API_KEY`, `TAVILY_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX`
- **Nearby Services:** `GOOGLE_MAPS_API_KEY`
- **Appointments:** `NEXHEALTH_API_KEY`, `NEXHEALTH_SUBDOMAIN`, `NEXHEALTH_LOCATION_ID`

Restart the backend after configuration.

## 🚀 Getting Started

1. Open Healix and sign up using email or Google.
2. Complete your user profile.
3. Add health records and medicine reminders.
4. Compare medicine prices or estimate insurance premiums.
5. Configure optional API keys to enable additional services.

## 🔍 Check Feature Status

```bash
curl http://localhost:3000/api/features-status
```

## 🛠️ Troubleshooting

- **Reminders not working:** Check Firebase notifications and scheduler configuration.
- **Health records failing:** Verify Supabase credentials and database tables.
- **MediChat unavailable:** Verify AI service API keys.
- **Nearby services unavailable:** Check the Google Maps API key.
- **Appointments failing:** Verify NexHealth credentials.

**Note:** Feature availability depends on valid configuration and external service availability. Never commit `.env` files or private API keys to GitHub.
