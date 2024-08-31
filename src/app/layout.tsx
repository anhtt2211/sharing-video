import * as React from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import '@/styles/colors.css';
import '@/styles/globals.css';

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
