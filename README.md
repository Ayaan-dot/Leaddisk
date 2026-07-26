# LeadDesk Mini

A production-ready MERN stack lead management application with a modern SaaS UI, admin dashboard, and public lead capture form.

## Features

### Public Website
- Modern landing page with hero section
- Feature showcase
- Lead capture form with full validation
- Responsive design
- Dark mode support

### Admin Dashboard
- Secure JWT authentication with HTTP-only cookies
- Real-time lead statistics (Total, New, Contacted, Closed)
- Advanced search by name or email (case-insensitive)
- Lead status management (New → Contacted → Closed)
- Pagination (10 leads per page)
- Copy email to clipboard
- Responsive sidebar navigation

### Security
- Password hashing with bcryptjs (12 rounds)
- JWT-based authentication with configurable expiration
- HTTP-only cookies for token storage
- Helmet for HTTP headers security
- Rate limiting to prevent brute force attacks
- CORS configuration
- Input validation on both frontend and backend
- Global error handling middleware

## Tech Stack

### Frontend
- React 19
- Vite (Build tool)
- React Router DOM v6
- Tailwind CSS (Styling)
- Axios (HTTP client)
- React Hot Toast (Notifications)

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Database)
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password hashing)
- Helmet (Security headers)
- express-rate-limit (Rate limiting)

## Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- npm or yarn

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run seed    # Creates admin account
npm run dev     # Starts development server on port 5000
```

### Frontend Setup

```bash
cd client
npm install
npm run dev     # Starts development server on port 5173
```

## Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leaddesk?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

## Default Admin Credentials

After running the seed script:

- **Email:** admin@example.com
- **Password:** Admin@123

## API Routes

### Authentication
| Method | Route           | Description          | Auth Required |
|--------|-----------------|----------------------|---------------|
| POST   | /api/auth/login | Login admin          | No            |
| POST   | /api/auth/logout| Logout admin         | No            |
| GET    | /api/auth/me    | Get current user     | Yes           |

### Leads
| Method | Route              | Description           | Auth Required |
|--------|-------------------|-----------------------|---------------|
| POST   | /api/leads        | Create new lead       | No            |
| GET    | /api/leads        | Get all leads (paginated) | Yes        |
| PATCH  | /api/leads/:id    | Update lead status    | Yes           |
| GET    | /api/leads/search | Search leads by name/email | Yes       |

## Folder Structure

```
LeadDesk-Mini/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── DarkModeToggle.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FeatureCard.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── LeadForm.jsx
│   │   │   ├── LeadTable.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SkeletonLoader.jsx
│   │   │   └── StatusBadge.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Landing.jsx
│   │   │   └── Login.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── DarkModeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useLeads.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── leadService.js
│   │   ├── utils/
│   │   │   ├── formatters.js
│   │   │   └── validators.js
│   │   └── assets/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/                    # Express backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── leadController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── verifyToken.js
│   ├── models/
│   │   ├── User.js
│   │   └── Lead.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── leadRoutes.js
│   ├── utils/
│   │   └── AppError.js
│   ├── app.js
│   ├── server.js
│   ├── seed.js
│   ├── .env.example
│   └── package.json
├── README.md
└── PLAN.md
```

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set root directory to `client/`
3. Set build command to `npm run build`
4. Set output directory to `dist`

### Backend (Render)
1. Create a new Web Service on Render
2. Set root directory to `server/`
3. Set build command to `npm install`
4. Set start command to `npm start`
5. Add environment variables from `.env.example`

## Future Improvements
- Email notifications for new leads
- CSV/Excel export functionality
- Lead assignment to team members
- Activity log and audit trail
- File attachments for leads
- Multi-admin support with roles
- Webhook integrations
- API documentation with Swagger

## Screenshots

*Screenshots coming soon*

## License

MIT

