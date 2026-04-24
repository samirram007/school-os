import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import { AuthProvider } from './features/auth/contexts/auth-context';

import { TanStackQueryProvider } from './integrations/tanstack-query/root-provider';
import { AppRouter } from './app-router';

import { Toaster } from './components/ui/sonner';
import './styles.css'




const rootElement = document.getElementById('app') as HTMLElement
if (rootElement && !rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <TanStackQueryProvider>
        <AuthProvider>
          <Toaster position="bottom-right" richColors />
          <AppRouter />
        </AuthProvider>
      </TanStackQueryProvider>
    </StrictMode>
  );

}

