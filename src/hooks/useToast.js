import { create } from 'zustand';

/**
 * TOAST STORE + HOOK
 * ──────────────────────────────────────────────────────────────
 * Lightweight toast/snackbar system — no external library needed.
 *
 * Usage:
 *   import useToast from '../hooks/useToast';
 *
 *   const toast = useToast();
 *   toast.success('Added to wishlist!');
 *   toast.error('Something went wrong.');
 *   toast.info('Please log in first.');
 *
 * Mount <ToastContainer /> once at the app root (e.g. App.jsx).
 * ──────────────────────────────────────────────────────────────
 */

// ── Internal Zustand store (not exported directly) ─────────────
const useToastStore = create((set) => ({
  toasts: [],

  add: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: Date.now() + Math.random(),
          message: toast.message,
          type: toast.type || 'info',   // 'success' | 'error' | 'info' | 'warning'
          duration: toast.duration || 3000,
        },
      ],
    })),

  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

// ── Public hook ────────────────────────────────────────────────
const useToast = () => {
  const add = useToastStore((s) => s.add);

  const show = (message, type = 'info', duration = 3000) =>
    add({ message, type, duration });

  return {
    success: (message, duration) => show(message, 'success', duration),
    error: (message, duration) => show(message, 'error', duration),
    info: (message, duration) => show(message, 'info', duration),
    warning: (message, duration) => show(message, 'warning', duration),
  };
};

export default useToast;
export { useToastStore };
