import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainLayout } from './layouts/MainLayout';
import { ProtectedRoute } from './components';
import {
  HomePage,
  LoginPage,
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
          <Route
            path="/login"
            element={
              <MainLayout>
                <LoginPage />
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
            path="/dashboard/admin"
            element={
              <MainLayout>
                <ProtectedRoute roles={['admin']}>
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
