import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import store from 'store';

import App from 'App.tsx';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { refetchOnWindowFocus: false }
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    </StrictMode>
);
