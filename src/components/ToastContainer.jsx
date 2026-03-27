import React, { useEffect } from 'react';
import { useToastStore } from '../hooks/useToast';

/**
 * TOAST CONTAINER
 * ──────────────────────────────────────────────────────────────
 * Mount this ONCE at the top of your app (e.g. inside App.jsx):
 *
 *   import ToastContainer from './components/ToastContainer';
 *
 *   function App() {
 *     return (
 *       <>
 *         <ToastContainer />
 *         <Router> ... </Router>
 *       </>
 *     );
 *   }
 * ──────────────────────────────────────────────────────────────
 */

const ICONS = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
};

const COLORS = {
  success: 'bg-green-500',
  error:   'bg-red-500',
  info:    'bg-[#01b4e4]',
  warning: 'bg-amber-500',
};

const Toast = ({ toast }) => {
  const remove = useToastStore((s) => s.remove);

  useEffect(() => {
    const timer = setTimeout(() => remove(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.id, toast.duration, remove]);

  return (
    <div
      className={`
        flex items-center gap-3 min-w-[260px] max-w-[380px]
        text-white rounded-lg px-4 py-3 shadow-xl
        animate-slide-in cursor-pointer select-none
        ${COLORS[toast.type] || COLORS.info}
      `}
      onClick={() => remove(toast.id)}
      role="alert"
    >
      <span className="text-lg font-bold shrink-0">
        {ICONS[toast.type]}
      </span>
      <p className="text-[14px] font-medium leading-snug">{toast.message}</p>
    </div>
  );
};

const ToastContainer = () => {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <>
      {/* Inject the slide-in animation (once) */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease forwards;
        }
      `}</style>

      {/* Portal-like fixed container — bottom-right corner */}
      <div
        className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} />
          </div>
        ))}
      </div>
    </>
  );
};

export default ToastContainer;
