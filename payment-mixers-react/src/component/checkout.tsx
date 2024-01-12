import React, { useState, useMemo, useEffect } from 'react'
import { MojitoCheckout, ThemeConfiguration } from '@mojito-inc/mixers';
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface CheckoutProps {
  success?: boolean;
  open?: boolean;
}

const Checkout = ({ success, open }: CheckoutProps) => {
  const { isAuthenticated, isLoading, getIdTokenClaims, loginWithPopup, logout } =
    useAuth0();

  const getConfigData = React.useMemo(() => {
    const data = sessionStorage.getItem('configData');
    return data ? JSON.parse(data) : null;
  }, []);
  
  const [show, setShow] = useState(false);
  const [configData, setConfigData] = useState({
    orgId: getConfigData?.orgId || '',
    lotId: getConfigData?.lotId || '',
    invoiceId: getConfigData?.invoiceId || '',
    listingId: getConfigData?.listingId || '',
  });

  const openModal = () => {
    if (typeof window != 'undefined') {
      sessionStorage.setItem('configData', JSON.stringify(configData));
    }
    setShow(true);
  };

  const onChange = (event: string, name: string) => {
    setConfigData(prev => ({
      ...prev,
      [name]: event,
    }));
  }

  const onClickLogin = async () => {
    if (isAuthenticated) {
        logout({
            logoutParams: {
              returnTo: window.location.origin,
            },
        });
    } else {
        await loginWithPopup({ authorizationParams: { prompt: "login" } });
    }
  };

  const bearerToken = useMemo(() => {
    if (typeof window !== 'undefined') {
      const res = localStorage.getItem('BearerToken') ?? '';
      return res ? JSON.parse(res) : '';
    }
    return '';
  }, []);

  const getAuthenticationToken = async () => {
    const token = await getIdTokenClaims();
    const authToken = token?.__raw;
    if (typeof window !== 'undefined' && authToken) {
      localStorage.setItem('BearerToken', JSON.stringify(authToken));
    }
    // eslint-disable-next-line no-underscore-dangle
    return token ? `${token?.__raw}` : "";
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAuthenticationToken();
    }
  }, [isAuthenticated]);

  const theme = {
    font: {
      primary: 'untitled_sansregular_regular',
      secondary: 'untitled_sansregular_regular',
    },
    color: {
      primary: '#6663FD',
      secondary: '#FFFFFF',
      background: '#FAFAFC',
      errorBackground: '#FEE3E5',
      text: '#000000',
      cardBackground: '#FFFFFF',
      borderColor: '#242629',
      radioCheckedColor: '#242629',
      checkout: {
        continueButtonBackground: '#FFFFFF',
        continueButtonTextColor: '#242629',
        continueButtonBorderColor: '#242629',
      },
      placeholder: '#BABEC5',
      costBreakdown: {
        applyButtonBackground: '#DADAE9',
        applyButtonTextColor: '#FFFFFF',
      },
      connectWalletColors: {
        primary: '#242629',
        secondary: '#BDBDBD',
        buttonColor: '#242629',
        buttonBackgroundColor: '#fff',
        disabledButtonBackgroundColor: '#F5F5F5',
        disabledButtonColor: '#BDBDBD',
      },
    },
  };

  return (
    <div>
      <Button disabled={ isLoading } onClick={onClickLogin}>
        {isLoading ? 'Loading...' : isAuthenticated ? "Logout" : "Login"}
      </Button>
      <Button disabled={!isAuthenticated || isLoading} onClick={openModal}>
        Open Mixers
      </Button>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Stack width={{ xs: '100%', sm: '100%', md: '100%', lg: '50%' }} sx={{ marginTop: '24px' }} alignItems="center" direction="column" spacing={2}>
          <Box sx={{ width: '100%' }}>
            <p>Organization id</p>
            <TextField fullWidth required placeholder="Enter organization id" value={configData.orgId} onChange={ (e) => onChange(e.target.value, 'orgId') } />
          </Box>
          <Box sx={{ width: '100%' }}>
            <p>Lot id</p>
            <TextField fullWidth required placeholder="Enter lot id" value={configData.lotId} onChange={ (e) => onChange(e.target.value, 'lotId') } />
          </Box>
          <Box sx={{ width: '100%' }}>
            <p>Listing id</p>
            <TextField fullWidth required placeholder="Enter listing id" value={configData.listingId} onChange={ (e) => onChange(e.target.value, 'listingId') } />
          </Box>
          <Box sx={{ width: '100%' }}>
            <p>Invoice id</p>
            <TextField fullWidth placeholder="Enter invoice id" value={configData.invoiceId} onChange={ (e) => onChange(e.target.value, 'invoiceId') } />
          </Box>
        </Stack>
      </Box>
      <MojitoCheckout
        userInfo={{
          email: 'test@gmail.com',
        }}
        debug={ false }
        customTheme={ theme }
        token={ bearerToken }
        uri={ 'https://api-sandbox.mojito.xyz/query' }
        checkoutOptions={{
          orgId: configData.orgId,
          lotId: configData.lotId,
          quantity: 1,
          collectionItemId: configData.listingId,
          invoiceId: configData.invoiceId,
          vertexEnabled: true,
        }}
        uiConfiguration={{
          walletOptions: {
            enableEmail: true,
            enableMetamask: true,
            enableWalletConnect: true,
          },
          delivery: {
            creditCard: {
              enableMultiSig: false,
              checkoutApiKey: 'pk_sbox_snvdtl3vfybgh7msvch7ni2gpan',
            },
          },
          payment: {
            creditCard: true,
            walletConnect: false,
            wire: false,
            coinbase: false,
          },
          costBreakdown: { showDiscountCode: true },

          paymentConfirmation: {
            onGoTo: () => {},
          },
          global: {
            logoSrc: 'https://assets-global.website-files.com/645e63ab36fc91c80f486747/645e63ab36fc91c80f486762_Group%201.svg',
          },
          walletConnect: {
            orgId: configData.orgId,
            paperClientId: '659af8f3-6a4f-4f53-8936-ba0fa32b0db0',
            walletConnectProjectId: '89dbf545d9dfa635307b233d7b4ce5d4',
            isWeb2Login: true,
            skipSignature: false,
            activeChain: 'sepolia',
            clientId: '6d88de19e1a489546ad58e294c8dba4b',
          },
        }}
        events={{
          onEvent: () => {},
        }}
        show={ open || show }
        success={ success } />
    </div>
  )
}

export default Checkout;