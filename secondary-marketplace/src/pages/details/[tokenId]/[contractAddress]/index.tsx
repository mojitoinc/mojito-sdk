import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Box, TextField } from "@mui/material";
import { ProductDetailPage } from "@mojito-inc/secondary-market";
import { useRouter } from "next/router";
import { Images } from "@/assets/images";
import GuideLayout from "@/components/GuideLayout";
import { configuration } from "@/config";
import Context from "@/provider/WalletDetailProvider";

const DetailsPage = () => {
  const router = useRouter();
  const { walletDetails, setWalletDetails } = useContext(Context);
  const [priceInputRange, setPriceInputRange] = useState('');

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceInputRange(event.target.value);
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

  const ImageData = useMemo(() => {
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

  const onClickDocument = useCallback((event: string) => {
    window.open(event, '_blank');
  }, []);

  return (
    <Box>
      <TextField sx={{ marginLeft: '40px', marginTop: '40px' }} value={ priceInputRange } onChange={ onChange } placeholder="Input range" />
      <GuideLayout
        onClickDocument={ () => onClickDocument('https://developers.mojito.xyz/v2.0/docs/secondary-marketplace-sdk') }
        isDetailPage
        title="Product Details Page"
        onClickModal={ () => undefined } />
      <Box sx={{ height: '30px' }} />
      <ProductDetailPage
        config={ config }
        Image={ ImageData }
        walletDetails={ walletDetails }
        priceInputRange={ +priceInputRange }
        onClickDisconnectWallet={ onClickDisconnectWallet }
        onConnectWallet={ onConnectWallet }
        onRefetchBalance={ onRefetchBalance }
        tokenDetails={{
          onChainTokenID: String(router?.query?.tokenId ?? '5'),
          contractAddress: String(router?.query?.contractAddress ?? '0x78ffce1a3d5917c5f983207917893795736b47a2'),
        }} />
    </Box>
  );
}

export default DetailsPage;
