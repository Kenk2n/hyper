import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// ✅ React Query 관련 import
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/Toast';

// ✅ QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
    <React.StrictMode>
        {/* ✅ App 전체를 QueryClientProvider로 감쌈 */}
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <App />
            </ToastProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
