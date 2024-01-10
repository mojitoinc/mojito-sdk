import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { ProductDetailPage } from "@mojito-inc/secondary-market";
import { Images } from "@/assets/images";
import GuideLayout from "@/components/GuideLayout";
import { configuration } from "@/config";
import Context from "@/provider/WalletDetailProvider";
import TokenInput from "@/components/TokenInput";
import { useDetailsForm } from "@/hooks/useDetailsForm";

const DetailsPage = () => {
  const { walletDetails, setWalletDetails } = useContext(Context);
  const router = useRouter();

  const routerData = useMemo(() => {
    const data: any = router.query?.data || null;
    if (data) {
      const parseData = JSON.parse(data);
      return parseData;
    }
    return null;
  }, [router]);

  const initialState = useMemo(() => {
    return {
      tokenId: '',
      contractAddress: '',
    };
  }, []);

  const [values, handleChange] = useDetailsForm(initialState);

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
      <Box sx={{ padding: { xs: '16px', sm: '16px', lg: '30px' } }}>
        { routerData?.contractAddress && (
          <Box sx={{ marginBottom: '16px' }}>
            <TokenInput
              tokenId={ values.tokenId }
              contractAddress={ values.contractAddress }
              showItemId={ false }
              onChange={ handleChange } />
          </Box>
        ) }
        <GuideLayout
          onClickDocument={ () => onClickDocument('https://developers.mojito.xyz/v2.0/docs/secondary-marketplace-sdk') }
          isDetailPage
          title="Product Details Page"
          onClickModal={ () => undefined } />
        <Box sx={{ height: '30px' }} />
      </Box>
      <ProductDetailPage
        config={ config }
        Image={ ImageData }
        walletDetails={ walletDetails }
        onClickDisconnectWallet={ onClickDisconnectWallet }
        onConnectWallet={ onConnectWallet }
        onRefetchBalance={ onRefetchBalance }
        tokenDetails={{
          onChainTokenID: routerData?.tokenId?.toString() ?? (values.tokenId ? values.tokenId : '1'),
          contractAddress: routerData?.contractAddress ?? (values.contractAddress ? values.contractAddress : '0x78ffce1a3d5917c5f983207917893795736b47a2'),
        }} />
    </Box>
  );
}

export default DetailsPage;
