# 🚀 AI Career Assistant

An AI-powered web application that helps users **build, analyze, and improve their careers** using intelligent tools like resume generation, ATS-based resume analysis, and interview preparation.

---

## ✨ Features

- 🧠 **AI Resume Generator** – Generate professional resumes instantly
- 📄 **AI Resume Analyzer (ATS Based)** – Upload PDF resumes and get smart feedback
- 🎯 **Role-Based Suggestions** – Tailored improvements based on job role
- 💼 **Interview Preparation** – Practice interview questions powered by AI
- 🔐 **Authentication System** – Secure login/signup using JWT
- 📊 **Usage Tracking** – Daily usage limits & credits system
- ⚡ **Fast & Responsive UI**

---

## 🛠️ Tech Stack

### Frontend

- Next.js (React)
- Redux Toolkit
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)

### AI Integration

- Groq API
- LangChain

### Other Tools

- Multer (File Upload)
- JWT Authentication

---

## 📂 Project Structure

```
AI-Career-Assistant/
│
├── Backend/
│   ├── Config/
│   ├── Controller/
│   ├── MiddleWare/
│   ├── Model/
│   ├── Prompts/
│   ├── Routes/
│   ├── Services/
│   ├── Validator/
│   └── Server.js
│
├── Frontend/
│   ├── Component/
│   ├── Features/
│   ├── Libraries/
│   ├── app/
│   └── public/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/smabdullah958/AI-Career-Assistant.git
cd AI-Career-Assistant
```

---

## ▶️ Run Frontend

```bash
cd Frontend
npm install
```

Create `.env` file inside **Frontend**:

```env
NEXT_PUBLIC_BackendURL=your_backend_url
```

Run frontend:

```bash
npm run dev
```

---

## ▶️ Run Backend

```bash
cd Backend
npm install
```

Create `.env` file inside **Backend**:

```env
PortNo=5000
connection=your_mongodb_connection
SecretKey=your_jwt_secret
Frontend=your_frontend_url
Groq_API=your_groq_api_key
```

Run backend:

```bash
npm start
```

---

## 🔄 How It Works

1. User uploads resume (PDF)
2. System extracts text from PDF
3. AI analyzes resume based on role & experience
4. Returns:
   - Score
   - Suggestions
   - Improvements

---

## 📸 Screenshots

> ⚠️ Add screenshots here (very important for portfolio)

---

## 🚀 Future Improvements

- 🔍 Job Recommendation System
- 📈 Career Path Prediction
- 🌐 Multi-language Support
- 📊 Analytics Dashboard

---

## 📧 Contact

- 🌐 Portfolio: https://smabdullah.netlify.app/
- 💻 GitHub: https://github.com/smabdullah958

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
