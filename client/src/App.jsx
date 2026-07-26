import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                borderRadius: '12px',
                background: '#1F2937',
                color: '#F9FAFB',
                fontSize: '14px',
              },
              success: {
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#F9FAFB',
                },
              },
              error: {
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#F9FAFB',
                },
              },
            }}
          />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
}

