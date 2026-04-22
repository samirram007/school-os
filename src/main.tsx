import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { getRouter } from './router';
import { RouterProvider } from '@tanstack/react-router';
import './styles.css'
import { AuthProvider, useAuth } from './features/auth/contexts/auth-context';

import { TanStackQueryProvider } from './integrations/tanstack-query/root-provider';
import { AppRouter } from './app-router';


const router = getRouter()

const rootElement = document.getElementById('app') as HTMLElement
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </TanStackQueryProvider>
    </StrictMode>
  );

}

