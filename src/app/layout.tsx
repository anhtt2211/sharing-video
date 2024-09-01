import * as React from 'react';

import '@/styles/colors.css';
import '@/styles/globals.css';

import { AuthProvider } from '@/hooks/useAuth';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
