import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

/**
 * PROTECTED ROUTE
 * ──────────────────────────────────────────────────────────────
 * Wraps any route that requires authentication.
 * Redirects unauthenticated users to /login and stores the
 * original destination so they're sent back after login.
 *
 * Usage (in your Router):
 *
 *   import ProtectedRoute from './components/ProtectedRoute';
 *
 *   <Route
 *     path="/wishlist"
 *     element={
 *       <ProtectedRoute>
 *         <Wishlist />
 *       </ProtectedRoute>
 *     }
 *   />
 *   <Route
 *     path="/account"
 *     element={
 *       <ProtectedRoute>
 *         <AccountDetails />
 *       </ProtectedRoute>
 *     }
 *   />
 * ──────────────────────────────────────────────────────────────
 */
const ProtectedRoute = ({ children }) => {
  const user     = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    // Pass the current path so Login can redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
