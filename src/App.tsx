import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components';
import {
  HomePage,
  LoginPage,
  StudentLoginPage,
  AdminLoginPage,
  AdminRequestPage,
  SuperAdminLoginPage,
  RegisterPage,
  StudentDashboard,
  AdminDashboard,
  SuperAdminDashboard,
  MessagesPage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          
          {/* Login Routes - Role Based */}
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/login/student"
            element={
              <MainLayout>
                <StudentLoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/login/owner"
            element={
              <MainLayout>
                <AdminLoginPage />
              </MainLayout>
            }
          />
          <Route
            path="/login/superadmin"
            element={
              <MainLayout>
                <SuperAdminLoginPage />
              </MainLayout>
            }
          />
          
          <Route
            path="/register"
            element={
              <MainLayout>
                <RegisterPage />
              </MainLayout>
            }
          />

          <Route
            path="/admin/request"
            element={
              <MainLayout>
                <AdminRequestPage />
              </MainLayout>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard/student"
            element={
              <MainLayout>
                <ProtectedRoute roles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/owner"
            element={
              <MainLayout>
                <ProtectedRoute roles={['owner']}>
                  <AdminDashboard />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/dashboard/superadmin"
            element={
              <MainLayout>
                <ProtectedRoute roles={['superadmin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/messages"
            element={
              <MainLayout>
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              </MainLayout>
            }
          />

          {/* Not Found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;

