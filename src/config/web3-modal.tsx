'use client';

import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Config,
  WagmiProvider,
  cookieToInitialState,
  cookieStorage,
  createStorage,
  http,
} from 'wagmi';
import { scroll } from '@reown/appkit/networks';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

export const projectId = '1234';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal',
  url: '',
  icons: [''],
};

const wagmiAdapter = new WagmiAdapter({
  networks: [scroll],
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected(),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
  transports: {
    [scroll.id]: http(scroll.rpcUrls.default.http),
  },
  projectId,
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
});

const queryClient = new QueryClient();

export default function Web3ModalProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
