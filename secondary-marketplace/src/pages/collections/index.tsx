import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { CollectionPage } from '@mojito-inc/secondary-market';
import { configuration } from '@/config';
import Context from '@/provider/WalletDetailProvider';
import { Images } from '@/assets/images';
import { useRouter } from 'next/router';

interface TokenProps {
  id?: string;
  tokenId?: number;
  contractAddress?: string;
}

const Collection = () => {
  const router = useRouter();
  const { walletDetails, setWalletDetails } = useContext(Context);

  const Image = useMemo(() => {
    return {
      ethIcon: Images.ETH_ICON.src,
      logo: Images.LOGO_ICON.src,
      metamask: Images.METAMASK.src,
      walletConnect: Images.WALLET_CONNECT.src,
      loader: Images.LOADER.src,
      wethIcon: Images.WETH_ICON.src,
      maticIcon: Images.MATIC.src,
    };
  }, []);

  const config = useMemo(() => {
    return {
      orgId: configuration.orgId,
      projectId: configuration.projectId,
      paperClientId: configuration.paperClientId,
      walletOptions: {
        enableEmail: true,
        enableMetamask: true,
        enableWalletConnect: true
      },
      chainId: 80001,
    };
  }, []);

  useEffect(() => {
    if (walletDetails?.disConnect) {
      setWalletDetails(prev => ({
        ...prev,
        disConnect: false,
      }));
    }
  }, [walletDetails, setWalletDetails]);

  useEffect(() => {
    if (walletDetails?.refetchBalance) {
      setWalletDetails(prev => ({
        ...prev,
        refetchBalance: false,
      }));
    }
  }, [walletDetails, setWalletDetails]);

  const onClickDisconnectWallet = useCallback(() => {
    setWalletDetails(prev => ({
      ...prev,
      walletAddress: '',
      balance: {
        native: 0,
        nonNative: 0,
      },
      networkDetails: {
        id: '',
        name: '',
        chainID: 0,
        isTestnet: false,
      },
      refetchBalance: false,
      open: false,
      disConnect: true,
    }));
  }, [setWalletDetails]);

  const onConnectWallet = useCallback(() => {
    setWalletDetails(prev => ({
      ...prev,
      open: true,
    }));
  }, [setWalletDetails]);

  const onRefetchBalance = useCallback(() => {
    setWalletDetails(prev => ({
      ...prev,
      refetchBalance: true,
    }));
  }, [setWalletDetails]);

  const onClickCard = useCallback((event?: TokenProps) => {
    const objectToSend = { tokenId: event?.tokenId, contractAddress: event?.contractAddress };
    const serializedObject = JSON.stringify(objectToSend);
    router.push(`/detail?data=${ encodeURIComponent(serializedObject) } `);
  }, [router]);

  return (
    <>
      <CollectionPage
        marketplaceID={ configuration.marketPlaceId }
        Image={ Image }
        config={ config }
        walletDetails={ walletDetails }
        onClickCard={ onClickCard }
        onConnectWallet={ onConnectWallet }
        onRefetchBalance={ onRefetchBalance }
        onClickDisconnectWallet={ onClickDisconnectWallet } />
    </>
  )
}

export default Collection;