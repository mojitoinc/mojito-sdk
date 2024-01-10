import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import router from 'next/router';
import { WalletsPage }from '@mojito-inc/secondary-market';
import { configuration } from '@/config';
import Context from '@/provider/WalletDetailProvider';
import { Images } from '@/assets/images';

interface TokenProps {
  id?: string;
  tokenId?: number;
  contractAddress?: string;
  networkId?: string;
}

export enum ListingType {
  SALE = "sale",
  CLAIMABLE = "claimable",
}

const Wallets = () => {
  const { walletDetails, setWalletDetails } = useContext(Context);

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

  const onClickCard = useCallback((event?: TokenProps) => {
    const objectToSend = { tokenId: event?.tokenId, contractAddress: event?.contractAddress, networkId: event?.networkId };
    const serializedObject = JSON.stringify(objectToSend);
    router.push(`/detail?data=${ encodeURIComponent(serializedObject) } `);
  }, []);

  const onClickViewItem = useCallback((event?: TokenProps) => {
    const objectToSend = { tokenId: event?.tokenId, contractAddress: event?.contractAddress };
    const serializedObject = JSON.stringify(objectToSend);
    router.push(`/detail?data=${ encodeURIComponent(serializedObject) } `);
  }, []);


  return (
    <WalletsPage
      walletDetails={ walletDetails }
      listingType={ListingType?.CLAIMABLE}
      config={ config }
      Image={ Image }
      showMenu
      priceInputRange={ 6 }
      onClickLogout={ onClickDisconnectWallet }
      onConnectWallet={ onConnectWallet }
      onClickCard={ onClickCard }
      onViewItem={ onClickViewItem } /> 
  );
};

export default Wallets;
