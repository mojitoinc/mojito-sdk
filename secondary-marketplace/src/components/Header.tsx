'use client';

import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { AppBar, Stack, Toolbar, Typography, Box, ThemeProvider } from '@mui/material';
import { GetClaimInvoiceDetailData } from '@mojito-inc/core-service';
import { ConnectWalletContainer, TokenGatingContainer, useNetwork, useProvider, useWallet } from '@mojito-inc/connect-wallet';
import { Images } from '@/assets/images';
import Context from '@/provider/WalletDetailProvider';
import { configuration } from '@/config';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TokenGatingContext from '@/provider/TokenGatingProvider';
import { connectWalletTheme } from '@/theme/ConnectWalletTheme';

const Header = () => {
  const router = useRouter();
  const { walletDetails, setWalletDetails } = useContext(Context);
  const { tokenGatingDetails, setTokenGatingDetails } = useContext(TokenGatingContext);

  const networkDetails = useNetwork();
  const { provider, providerType } = useProvider();
  const { address, balance } = useWallet();

  useEffect(() => {
    if (networkDetails && provider && address) {
      setWalletDetails(prev => ({
        ...prev,
        walletAddress: address,
        providerType,
        balance,
        networkDetails,
        provider,
      }));
    }
  }, [networkDetails, provider, address, providerType, balance, setWalletDetails]);

  const onCloseWalletModal = useCallback(() => {
    setWalletDetails(prev => ({
      ...prev,
      open: false,
    }));
  }, [setWalletDetails]);

  const onClickCollection = useCallback(() => {
    router.push('/collections');
  }, [router]);

  const onClickWallets = useCallback(() => {
    router.push('/wallets');
  }, [router]);

  const onClickDetails = useCallback(() => {
    router.push('/detail');
  }, [router]);

  const onClickDisconnect = useCallback(() => {
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

  const onClickConnect = useCallback(() => {
    setWalletDetails(prev => ({
      ...prev,
      open: true,
    }));
  }, [setWalletDetails]);

  const onCloseTokenGatingModal = useCallback(() => {
    setTokenGatingDetails((prev) => ({
      ...prev,
      open: false
    }));
  }, [setTokenGatingDetails]);

  const onClickClaim = useCallback(() => {
    onCloseTokenGatingModal();
  }, [onCloseTokenGatingModal]);

  const claimTokenScreenDetails = useMemo(() => ({
    tokenDetail: {
      tokenImage: tokenGatingDetails?.successScreenDetail?.tokenImage,
      tokenButtonText: tokenGatingDetails?.successScreenDetail?.tokenButtonText,
      tokenName: tokenGatingDetails?.successScreenDetail?.tokenName,
      tokenSubtitle: tokenGatingDetails?.successScreenDetail?.tokenSubtitle,
    },
    redirectionPageURL: tokenGatingDetails?.successScreenDetail?.redirectionPageURL,
    onSuccess: onClickClaim,
  }), [onClickClaim, tokenGatingDetails?.successScreenDetail]);

  const onClickErrorPrimaryButton = useCallback(() => {
    onCloseTokenGatingModal();
  }, [onCloseTokenGatingModal]);

  const onClickTertiaryButton = useCallback(() => {
    onCloseTokenGatingModal();
  }, [onCloseTokenGatingModal]);

  const errorScreenDetails = useMemo(() => ({
    title: tokenGatingDetails?.noClaimScreenDetail?.title,
    primaryButtonTitle: tokenGatingDetails?.noClaimScreenDetail?.primaryButtonTitle,
    redirectionPageURL: tokenGatingDetails?.noClaimScreenDetail?.redirectionPageURL,
    onClickPrimaryButton: onClickErrorPrimaryButton,
    onClickTertiaryButton,
  }), [onClickErrorPrimaryButton, onClickTertiaryButton, tokenGatingDetails?.noClaimScreenDetail]);

  const walletOptions = useMemo(() => ({
    enableEmail: tokenGatingDetails.walletOptions.enableEmail,
    enableMetamask: tokenGatingDetails.walletOptions.enableMetamask,
    enableWalletConnect: tokenGatingDetails.walletOptions.enableWalletConnect,
  }), [tokenGatingDetails.walletOptions]);

  const image = useMemo(() => ({
    error: Images.ETH_ICON.src,
    logo: Images.LOGO_ICON.src,
    metamask: Images.METAMASK.src,
    walletConnect: Images.WALLET_CONNECT.src,
  }), []);

  const walletConnectScreenDetails = useMemo(() => ({
    walletOptions,
    image,
  }), [image, walletOptions]);

  const onClickTokenGating = useCallback(() => {
    router.push('/tokenGating');
  }, [router])

  const groupId = useMemo(() => !tokenGatingDetails.groupId ? configuration.groupId : tokenGatingDetails.groupId, [tokenGatingDetails.groupId]);
  const collectionItemId = useMemo(() => !tokenGatingDetails?.collectionItemId ? configuration.collectionItemId : tokenGatingDetails?.collectionItemId, [tokenGatingDetails?.collectionItemId]);

  const setInvoice = useCallback((id: string) => {
    setTokenGatingDetails(prev => ({
      ...prev,
      invoiceId: id
    }));
  }, [setTokenGatingDetails]);

  const orgId = useMemo(() => tokenGatingDetails.orgId == '' ? configuration.orgId : tokenGatingDetails.orgId, [tokenGatingDetails.orgId]);

  const getInvoiceDetails = useCallback((data?: GetClaimInvoiceDetailData) => {
    if (data) {
      setTokenGatingDetails(prev => ({
        ...prev,
        invoiceDetails: data
      }));
    }
  }, [setTokenGatingDetails]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Link href="/">
          <Image src={Images.LOGO_ICON} alt='Logo' style={{ height: '70px', width: '100px', objectFit: 'contain', cursor: 'pointer' }} />
        </Link>
        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }} justifyContent="flex-end">
          {walletDetails?.walletAddress ? (
            <Typography sx={{ cursor: 'pointer' }} onClick={onClickDisconnect}>Disconnect</Typography>
          ) : (
            <Typography sx={{ cursor: 'pointer' }} onClick={onClickConnect}>Connect</Typography>
          )}
          <Typography sx={{ cursor: 'pointer' }} onClick={onClickWallets}>Wallets</Typography>
          <Typography sx={{ cursor: 'pointer' }} onClick={onClickCollection}>Collections</Typography>
          <Typography sx={{ cursor: 'pointer' }} onClick={onClickDetails}>Details</Typography>
          <Typography sx={{ cursor: 'pointer' }} onClick={onClickTokenGating}>Token Gating</Typography>
        </Stack>
      </Toolbar>
      <ThemeProvider theme={ connectWalletTheme }>
        <ConnectWalletContainer
          open={walletDetails?.open}
          config={{
            organizationId: configuration.orgId,
            paperClientId: configuration.paperClientId,
            paperNetworkName: 'Polygon',
          }}
          walletOptions={walletOptions}
          image={image}
          isDisConnect={walletDetails?.disConnect}
          isRefetchBalance={walletDetails?.refetchBalance}
          onCloseModal={onCloseWalletModal} />
        <Box sx={{ width: '100%' }}>
          <TokenGatingContainer
            claimTokenScreenDetails={claimTokenScreenDetails}
            errorScreenDetails={errorScreenDetails}
            walletConnectScreenDetails={walletConnectScreenDetails}
            onCloseModal={onCloseTokenGatingModal}
            open={tokenGatingDetails.open}
            screenConfig={tokenGatingDetails?.screenConfig ?? {}}
            setInvoice={setInvoice}
            config={{
              orgId,
              groupId,
              ruleId: tokenGatingDetails?.ruleId,
              collectionItemId,
              isClaimToken: tokenGatingDetails?.isClaimToken,
            }}
            getInvoiceDetails={getInvoiceDetails}
            invoiceID={tokenGatingDetails?.invoiceId}
          />
        </Box>
      </ThemeProvider>
    </AppBar>
  );
};

export default Header;
