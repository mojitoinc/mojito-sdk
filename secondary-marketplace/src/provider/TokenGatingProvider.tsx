import { configuration } from '@/config';
import React, { createContext, useContext, useState, useMemo } from 'react';
import { GetClaimInvoiceDetailData } from '@mojito-inc/core-service';

export interface TokenGatingDetails {
    orgId: string;
    groupId: string;
    open: boolean;
    walletOptions: {
        enableEmail: boolean;
        enableMetamask: boolean;
        enableWalletConnect: boolean;
    }
    ruleId?: string;
    isClaimToken?: boolean;
    collectionItemId?: string;
    invoiceId?: string;
    successScreenDetail?: {
        tokenImage: string;
        tokenButtonText: string;
        tokenName: string;
        tokenSubtitle: string;
        redirectionPageURL: string;
    };
    noClaimScreenDetail?: {
        title: string;
        primaryButtonTitle: string;
        redirectionPageURL: string;
    };
    screenConfig?: {
        title: string;
        subTitle: string;
    }
    invoiceDetails?: GetClaimInvoiceDetailData;
}

export interface TokenGatingContextProps {
    tokenGatingDetails: TokenGatingDetails,
    setTokenGatingDetails: (f: TokenGatingDetails | ((prev: TokenGatingDetails) => TokenGatingDetails)) => void;
}

interface TokenGatingProviderProps {
    children: React.ReactNode;
}

const TokenGatingContext = createContext<TokenGatingContextProps>({} as TokenGatingContextProps);

export default TokenGatingContext;

export function useTokenGating() {
    return useContext(TokenGatingContext);
}

export const TokenGatingProvider = ({
    children
}: TokenGatingProviderProps) => {
    const [tokenGatingDetails, setTokenGatingDetails] = useState<TokenGatingDetails>({
        orgId: configuration.orgId,
        groupId: configuration.groupId,
        open: false,
        isClaimToken: false,
        walletOptions: {
            enableEmail: true,
            enableMetamask: true,
            enableWalletConnect: true
        },
        screenConfig: {
            title: 'TokenHolders get 50%',
            subTitle: 'Holders of the Myers Manx collection can now get 50%. Connect your wallet to proceed.',
        },
        successScreenDetail: {
            tokenName: 'token name',
            tokenSubtitle: 'Congrats - as a holder of Myers Manx collection, you have access to this page and a 50% discount',
            tokenButtonText: 'Claim your Discount',
            tokenImage: 'https://cdn.pixabay.com/photo/2017/06/12/03/33/seo-2394237_1280.jpg',
            redirectionPageURL: 'https://mojito-secondary-marketplace-dev.netlify.app/detail',
        },
        noClaimScreenDetail: {
            primaryButtonTitle: 'Buy a Meyers Manx Wallet',
            title: 'We can\'t find a Myers Manx collection in this wallet.',
            redirectionPageURL: 'https://mojito-secondary-marketplace-dev.netlify.app/collections'
        },
        collectionItemId: configuration.collectionItemId,
    });

    const contextValue = useMemo(() => ({
        tokenGatingDetails, setTokenGatingDetails
    }), [tokenGatingDetails, setTokenGatingDetails]);

    return (
        <TokenGatingContext.Provider value={contextValue}>
            {children}
        </TokenGatingContext.Provider>
    )
}
