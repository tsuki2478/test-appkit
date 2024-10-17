import { headers } from 'next/headers';
import React from 'react';
import Web3ModalProvider from '../config/web3-modal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = headers().get('cookie');

  return (
    <html lang='en'>
      <head suppressHydrationWarning={true}>
        <title>Test</title>
      </head>
      <body>
        <Web3ModalProvider cookies={cookies}>{children}</Web3ModalProvider>
      </body>
    </html>
  );
}
