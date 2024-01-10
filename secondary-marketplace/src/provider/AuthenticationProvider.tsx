'use client';

import React, { useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { SecondaryMarketProvider } from '@mojito-inc/secondary-market';
import { ConnectWalletProvider } from '@mojito-inc/connect-wallet';
import { theme } from '@/theme';
import { configuration } from '@/config';
import { session } from '@/utils/sessionStorage,utils';
import { SessionVariable } from '@/constants';
import { WalletDetailsProvider } from './WalletDetailProvider';
import { TokenGatingProvider } from './TokenGatingProvider';
import { connectWalletTheme } from '@/theme/ConnectWalletTheme';

interface AuthenticationProviderProps {
    children: JSX.Element;
  }

const AuthenticationProvider = ({ children }: AuthenticationProviderProps) => {
  const [token, setToken] = useState<string>();
  const tokenData = session(SessionVariable.AuthToken, true);
  const client = useMemo(
    () => ({
      uri: configuration.api,
      token: tokenData ? `Bearer ${ tokenData }` : token ? `Bearer ${ token }` : undefined,
    }),
    [token, tokenData],
  );
  return (
    <ThemeProvider theme={ theme }>
      <WalletDetailsProvider>
        <TokenGatingProvider>
          <ConnectWalletProvider
            activeChain="polygon"
            clientId={ configuration.clientId }
            walletConnectProjectId={ configuration.projectId }
            onAuthenticated={ setToken }
            clientOptions={ client }
            theme={ connectWalletTheme }>
            <SecondaryMarketProvider
              theme={ theme }
              clientOptions={ client }>
              { children }
            </SecondaryMarketProvider>
          </ConnectWalletProvider>
        </TokenGatingProvider>
      </WalletDetailsProvider>
    </ThemeProvider>
  )
}

export default AuthenticationProvider;