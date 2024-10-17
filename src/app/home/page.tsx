'use client';

import { useAccount } from 'wagmi';
import { useAppKitAccount } from '@reown/appkit';
import { useEffect, useState } from 'react';
import React from 'react';

export default function Home() {
  const { isConnected: wagmiConnected } = useAccount();
  const { isConnected: appKitConnected } = useAppKitAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate appKit taking longer to sync login state
    if (wagmiConnected || appKitConnected) {
      setLoading(false);
    }
  }, [wagmiConnected, appKitConnected]);

  return (
    <div>
      <h1>Login State Sync Issue</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          Wagmi isConnected: {wagmiConnected ? 'Yes' : 'No'} <br />
          AppKit isConnected: {appKitConnected ? 'Yes' : 'No'}
        </p>
      )}
    </div>
  );
}
