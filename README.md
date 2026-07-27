# LeadDesk CRM 🚀

> **Premium CRM Solution for Modern Businesses** — Capture, manage, and convert leads with an intelligent, full-featured platform.

![LeadDesk CRM](https://img.shields.io/badge/version-1.0.0-emerald)
![React](https://img.shields.io/badge/React-18.2-61DAFB)
![Express](https://img.shields.io/badge/Express-4.18-000000)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-06B6D4)

---

## ✨ Features

- **📝 Lead Capture** — Multi-channel lead intake with smart forms
- **📊 Pipeline Management** — Visual sales pipeline with drag-and-drop status updates
- **🔍 Advanced Search** — Full-text search across leads, companies, and contacts
- **📈 Analytics Dashboard** — Real-time metrics, conversion tracking, and pipeline analytics
- **🔐 Authentication** — Secure JWT-based auth with HTTP-only cookies
- **🌙 Dark Mode** — Beautiful dark/light theme toggle
- **📱 Responsive** — Fully responsive design for desktop and mobile
- **⚡ Performance** — Optimized with lazy loading, skeleton screens, and lightweight animations

---

## 🛠️ Tech Stack

| Layer          | Technology                                      |
| -------------- | ----------------------------------------------- |
| **Frontend**   | React 18, Vite 5, TailwindCSS 3, Framer Motion |
| **Backend**    | Node.js, Express 4                              |
| **Database**   | MongoDB 8, Mongoose 8                           |
| **Auth**       | JWT, bcryptjs, HTTP-only cookies                |
| **Deployment** | Vercel (frontend), Render (backend)             |

---

## 📁 Folder Structure

```
LeadDesk/
├── client/                  # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Route pages
│   │   ├── services/        # API client (Axios)
│   │   └── utils/           # Helper functions
│   ├── .env.example
│   ├── vercel.json
│   ├── vite.config.js
│   └── package.json
├── server/                  # Express backend
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Express routes
│   ├── utils/               # Seed script
│   ├── .env.example
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** or **yarn**

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd leaddesk
```

### 2. Backend Setup

```bash
cd server
cp .env.example .env    # Configure your environment variables
npm install
npm run seed            # Seed sample data (optional)
npm run dev             # Start dev server on port 5000
```

### 3. Frontend Setup

```bash
cd client
cp .env.example .env    # Configure your environment variables
npm install
npm run dev             # Start dev server on port 5173
```

### 4. Access the Application

Open [http://localhost:5173](http://localhost:5173) in your browser.

**Default Credentials (after seeding):**
- Email: `admin@leaddesk.com`
- Password: `admin123`

---

## 🔐 Environment Variables

### Server (`server/.env`)

| Variable     | Description                    | Default               |
| ------------ | ------------------------------ | --------------------- |
| `PORT`       | Server port                    | `5000`                |
| `NODE_ENV`   | Environment mode               | `development`         |
| `MONGO_URI`  | MongoDB connection string      | (required)            |
| `JWT_SECRET` | JWT signing secret             | (required)            |
| `JWT_EXPIRE` | JWT expiration duration        | `7d`                  |
| `CLIENT_URL` | Frontend URL for CORS          | `http://localhost:5173` |

### Client (`client/.env`)

| Variable       | Description                    | Default                        |
| -------------- | ------------------------------ | ------------------------------ |
| `VITE_API_URL` | Backend API base URL           | `http://localhost:5000/api`    |

---

## 🌍 Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Set **Root Directory** to `client`
4. Add environment variables in Vercel dashboard:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
5. Deploy

### Backend → Render

1. Create a [Render](https://render.com) Web Service
2. Connect your GitHub repository
3. Set:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in Render dashboard:
   - `NODE_ENV` = `production`
   - `MONGO_URI` = `mongodb+srv://<user>:<pass>@cluster.mongodb.net/leaddesk`
   - `JWT_SECRET` = `<your-secret>`
   - `JWT_EXPIRE` = `7d`
   - `CLIENT_URL` = `https://your-frontend.vercel.app`
5. Deploy

### Database → MongoDB Atlas

1. Create a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (free tier works)
2. Whitelist Render/Vercel IPs or allow all IPs (`0.0.0.0/0`)
3. Copy the connection string
4. Set as `MONGO_URI` in your backend environment

---

## 🧪 Available Scripts

### Server

| Script           | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start dev server with hot reload   |
| `npm start`      | Start production server            |
| `npm run seed`   | Seed database with sample data     |

### Client

| Script             | Description                        |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start Vite dev server              |
| `npm run build`    | Build for production               |
| `npm run preview`  | Preview production build locally   |

---

## 📸 Screenshots

*(Add screenshots here)*

- Landing page with hero section
- Login / Register page
- Dashboard with stats
- Lead management table
- Analytics pipeline view
- Dark mode toggle

---

## 🔮 Future Improvements

- [ ] Email notifications & automated follow-ups
- [ ] Role-based access control (RBAC)
- [ ] CSV/Excel lead import/export
- [ ] Team collaboration with lead assignment
- [ ] Webhook integrations (Slack, HubSpot, Salesforce)
- [ ] Activity feed & audit logs
- [ ] Two-factor authentication (2FA)
- [ ] Mobile app (React Native)
- [ ] API rate limiting per user tier
- [ ] Real-time updates via WebSockets

---

## 📄 License

MIT © LeadDesk

---

## 🙌 Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an issue or submit a PR.

---

<p align="center">Made with ❤️ for modern businesses</p>

