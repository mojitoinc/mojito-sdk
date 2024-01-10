import React, { createContext, useContext, useState, useMemo } from 'react';
import { SupportedNetworksData } from '@/interface';

export interface ConnectType {
  walletAddress: string;
  networkDetails: SupportedNetworksData;
  providerType: string;
  balance: {
    native: number;
    nonNative: number;
  };
  provider: any;
  open: boolean;
  disConnect: boolean;
  refetchBalance: boolean;
}

export interface ContextType {
  walletDetails: ConnectType;
  setWalletDetails(f: ConnectType | ((prev: ConnectType) => ConnectType)): void;
}

interface ConnectWalletProviderProps {
  children: React.ReactNode;
}

const Context = createContext<ContextType>({} as ContextType);

export default Context;

export function useConnectWallet() {
  return useContext(Context);
}

export const WalletDetailsProvider = ({
  children,
}: ConnectWalletProviderProps) => {
  const [walletDetails, setWalletDetails] = useState<ConnectType>({
    walletAddress: '',
    providerType: '',
    networkDetails: {
      chainID: 0,
      id: '',
      isTestnet: false,
      name: '',
    },
    balance: {
      native: 0,
      nonNative: 0,
    },
    provider: null,
    disConnect: false,
    open: false,
    refetchBalance: false,
  });

  const contextValue = useMemo(() => (
    { walletDetails, setWalletDetails }
  ), [walletDetails, setWalletDetails]);

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
};
