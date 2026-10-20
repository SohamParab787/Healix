# Healix – Your Complete Healthcare Companion

Healix is a unified healthcare platform that brings health records, medicine reminders, pharmacy price comparison, appointment booking, nearby healthcare services, insurance tools, and an AI-powered health assistant into one application.

The platform aims to simplify healthcare management by helping users organize their medical information, manage medication schedules, explore healthcare services, and access useful health-related tools from a single place.

## ✨ Key Features

### 🔐 Authentication & Personalized Dashboard
- Email/password and Google sign-in using Firebase Authentication.
- Personalized health profiles with blood group, allergies, height, and weight.
- Dashboard displaying health metrics and upcoming appointments.

### 🩺 Digital Health Records
- Create, view, update, and delete medical records.
- Attach medical reports, prescriptions, and supporting documents.
- Store records and files using Supabase Database and Storage.

### 💊 Medicine Reminders
- Create recurring medicine schedules with dosage, time, and selected days.
- Background scheduling for due reminders.
- Push notifications through Firebase Cloud Messaging.

### 💰 Medicine Price Comparison
- Search for medicines across PharmEasy, Tata 1mg, and Apollo Pharmacy.
- Compare available listings and prices in one place.
- Handle individual source failures without blocking all results.

### 🤖 MediChat AI Assistant
- Ask health-related questions using natural language.
- Retrieve relevant information from reference documents.
- Use web search as a fallback when configured document retrieval is insufficient.
- Powered by LangGraph/LangChain, Groq, Pinecone, Hugging Face embeddings, and Tavily.

> MediChat provides informational assistance and is not a substitute for professional medical advice.

### 🧠 Insurance Premium Predictor
- Estimate insurance premiums using user-provided information.
- Run locally loaded ONNX models through the backend.
- Use a LightGBM-based prediction pipeline.

Predictions are estimates, not official insurance quotations.

### 🏥 Nearby Healthcare Services
- Search for nearby hospitals, pharmacies, laboratories, and doctors.
- Explore healthcare providers and selected specialties.
- Display available location details and ratings through Google Places.

### 📅 Appointment Booking
- Explore healthcare providers and available appointment slots.
- Book and review appointments through the application.
- Integrate with NexHealth, with fallback behavior for selected responses.

Full external booking functionality depends on the configured NexHealth credentials and supported endpoints.

### 🛡️ Government Insurance Eligibility
- Explore eligibility for schemes such as PM-JAY, ESIC, and CGHS.
- Evaluate user-provided details against scheme criteria.
- Demonstrate eligibility assessment through the current frontend implementation.

**Note:** The current frontend assessment uses demonstration data and is not yet connected to the backend assessment and history-saving APIs. Results should not be treated as official eligibility decisions.

---

## 🏗️ System Architecture

```text
                  ┌──────────────────────┐
                  │       User           │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │ React + TypeScript   │
                  │      Frontend        │
                  └──────────┬───────────┘
                             │
                  ┌──────────▼───────────┐
                  │ Node.js + Express    │
                  │      Backend         │
                  └──────────┬───────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
  ┌───────▼────────┐ ┌───────▼────────┐ ┌───────▼────────┐
  │    Supabase    │ │    Firebase    │ │ External APIs  │
  │ Database/Files │ │ Auth/FCM       │ │ Healthcare/AI  │
  └────────────────┘ └────────────────┘ └────────────────┘
```

The frontend communicates with the Express backend for protected operations. Firebase Authentication provides user identity, while Supabase stores application data and files. External healthcare, mapping, and AI services power selected features.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, React Router |
| Styling | Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | Supabase PostgreSQL |
| File Storage | Supabase Storage |
| Authentication | Firebase Authentication |
| Notifications | Firebase Admin, Firebase Cloud Messaging |
| AI Workflows | LangGraph, LangChain, Groq |
| Retrieval & Embeddings | Pinecone, Hugging Face embeddings |
| Machine Learning | LightGBM, ONNX Runtime |
| Healthcare Integrations | NexHealth, Google Places |
| Medicine Search | PharmEasy, Tata 1mg, Apollo Pharmacy |
| Web Search | Tavily |
| Scheduling | node-cron, Luxon |

## 📁 Project Structure

```text
Aarohan-26-CSI-RAIT-Recursion/
├── backend/                  # Express APIs and server-side logic
├── frontend/                 # React + TypeScript application
├── FEATURE_GUIDE.md          # Feature documentation
├── SETUP_GUIDE.md            # Setup instructions
├── SETUP_AND_OPTIMIZATION.md # Setup and optimization notes
├── package-lock.json
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Git
- A Firebase project
- A Supabase project
- API credentials for the external services you want to enable

### 1. Clone the Repository

```bash
git clone https://github.com/SohamParab787/Healix.git
cd Healix
```

### 2. Install Dependencies

Install the frontend and backend dependencies separately.

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create the required `.env` files using the variable names expected by the frontend and backend configuration.

Depending on the features you want to enable, configuration may include:

- Firebase project and authentication settings.
- Supabase project URL and database/storage credentials.
- Firebase Admin credentials and notification configuration.
- Groq and Pinecone credentials for MediChat.
- Tavily API key for web search.
- Google Maps/Places API key.
- NexHealth API credentials.

Keep secrets in environment variables. **Never commit API keys, private service-account files, or production credentials to GitHub.**

Refer to `SETUP_GUIDE.md` and `SETUP_AND_OPTIMIZATION.md` for project-specific setup details and the exact environment variable names.

### 4. Start the Application

Start the backend using the command configured in its `package.json`, for example:

```bash
cd backend
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

Open the local URL printed by Vite in your terminal.

> The commands above assume that the backend defines a `dev` script. If your `package.json` uses a different script, use the configured command.

## 🔑 External Service Configuration

Some features require external credentials and may not work until configured.

| Feature | Required service |
|---|---|
| Sign-in | Firebase Authentication |
| Health records | Supabase |
| Medicine notifications | Firebase Cloud Messaging |
| MediChat | Groq, Pinecone, Hugging Face embeddings, Tavily |
| Premium prediction | ONNX model files and compatible runtime |
| Nearby services | Google Maps/Places |
| Appointment booking | NexHealth |
| Medicine comparison | Supported pharmacy search endpoints |

Availability and response quality may depend on third-party APIs, account permissions, API limits, and network connectivity.

## ⚙️ Important Implementation Notes

- Firebase user identity must be correctly associated with the corresponding Supabase user data.
- Medicine reminders depend on notification permissions, valid device tokens, and correct time-zone scheduling.
- The insurance predictor requires the input fields to match the model's expected order and format.
- Pharmacy integrations normalize results from different response formats and handle individual source failures.
- MediChat requires its configured AI and retrieval services.
- Some appointment flows use fallback data when external responses are unavailable.
- Government insurance eligibility on the frontend is currently a demonstration and is not connected to the server-backed assessment flow.

## 🔒 Security & Privacy

- Do not commit `.env` files, API keys, access tokens, or private credentials.
- Protect backend routes and validate authentication tokens.
- Apply appropriate authorization checks before accessing personal health records or uploaded documents.
- Use secure configuration and access controls for database and storage resources.
- Do not use demonstration eligibility results or AI-generated responses as official medical or insurance decisions.

## 🚧 Future Improvements

- Connect government scheme eligibility to the backend assessment APIs.
- Improve automated testing and API integration coverage.
- Add richer health history and activity visualizations.
- Strengthen error handling and monitoring for third-party services.
- Improve deployment configuration and documentation.

## 👥 Team

**Team Recursion**

Developed for **Aarohan 1.0 – CSI RAIT**.

## 👨‍💻 Author

**Soham Parab**

- GitHub: [@SohamParab787](https://github.com/SohamParab787)
- Project Repository: [Healix](https://github.com/SohamParab787/Healix)

---

If you find this project interesting, consider giving the repository a ⭐.


