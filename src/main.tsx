import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';


import { AuthProvider } from './features/base-modules/auth/contexts/auth-context';

import { TanStackQueryProvider } from './integrations/tanstack-query/root-provider';
import { AppRouter } from './app-router';

import { Toaster } from './components/ui/sonner';
import './styles.css'
import { ThemeContextProvider } from './layouts/protected/contexts/theme-context';




const rootElement = document.getElementById('app') as HTMLElement
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <HelmetProvider>
        <TanStackQueryProvider>
          <ThemeContextProvider defaultTheme="light" storageKey="vite-ui-theme">

            <AuthProvider>
              <Toaster position="bottom-right" richColors />
              <AppRouter />
            </AuthProvider>
          </ThemeContextProvider>
        </TanStackQueryProvider>
      </HelmetProvider>
    </StrictMode>
  );

}

