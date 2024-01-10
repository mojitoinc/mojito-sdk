export interface SupportedNetworksData {
    chainID: number
    id: string;
    isTestnet: boolean;
    name: string;
  }
  
  export enum OfferStatus {
    PENDING = 'PENDING',
    CANCELLED = 'CANCELLED',
    REJECTED = 'REJECTED',
    FAILED = 'FAILED',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    REMOVED = 'REMOVED',
    PROCESSING = 'PROCESSING',
  }
  
  export interface WalletDetailsData {
    walletAddress: string;
    networkDetails: SupportedNetworksData
    providerType: string;
    balance: {
      native: number;
      nonNative: number;
    };
    provider: any;
  }

  export interface TokenPriceProps {
    value: number;
    unit: string;
    type: string;
  }

  export interface OfferDataProps {
    id: string;
    expiryDate: string;
    offerStatus: string;
    buyerAddress: string;
    price: TokenPriceProps[];
    userName: string;
    ownerWalletAddress: string;
  }