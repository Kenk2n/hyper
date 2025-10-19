import React, { createContext, useCallback, useContext, useState } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  type?: ToastType;
  durationMs?: number; // auto dismiss
}

interface ToastItem extends Required<Omit<ToastOptions, 'durationMs'>> {
  durationMs: number;
}

interface ToastContextValue {
  notify: (opts: ToastOptions | string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback((opts: ToastOptions | string) => {
    const id = `${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const base: ToastItem = {
      id,
      title: typeof opts === 'string' ? undefined : opts.title,
      description: typeof opts === 'string' ? (opts as string) : (opts.description ?? ''),
      type: typeof opts === 'string' ? 'info' : (opts.type ?? 'info'),
      durationMs: typeof opts === 'string' ? 3500 : (opts.durationMs ?? 3500),
    } as ToastItem;

    setToasts((prev) => [base, ...prev]);

    if (base.durationMs > 0) {
      window.setTimeout(() => remove(id), base.durationMs);
    }
  }, [remove]);

  React.useEffect(() => {
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<ToastOptions | string>;
      notify(ce.detail);
    };
    window.addEventListener('hs-toast', onCustom as EventListener);
    return () => window.removeEventListener('hs-toast', onCustom as EventListener);
  }, [notify]);

  return (
    <ToastContext.Provider value={{ notify }}>
      {children}
      {/* Toast Container: top-right */}
      <div className="fixed right-4 top-4 z-[1000] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className={`pointer-events-auto w-80 shadow-lg rounded-lg border ${
              t.type === 'success' ? 'bg-green-50 border-green-200' :
              t.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
              t.type === 'error' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'
            }`}
          >
            <div className="p-3">
              {t.title && <div className="text-sm font-semibold text-gray-900 mb-1">{t.title}</div>}
              <div className="text-sm text-gray-700">{t.description}</div>
            </div>
            <div className="px-3 pb-3 flex justify-end">
              <button onClick={() => remove(t.id)} className="text-xs text-gray-500 hover:text-gray-700">닫기</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
