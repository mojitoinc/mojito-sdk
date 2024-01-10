import React, { useState, useMemo, useEffect } from 'react'
import { MojitoCheckout, ThemeConfiguration } from '@mojito-inc/mixers';
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";

const Checkout = () => {
  const { isAuthenticated, isLoading, getIdTokenClaims, loginWithPopup, logout } =
    useAuth0();
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };

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
      <MojitoCheckout
        userInfo={{
          email: 'kameshkishore.s@ionixxtech.com',
        }}
        debug={ false }
        customTheme={ theme }
        token={ bearerToken }
        uri={ 'https://api-sandbox.mojito.xyz/query' }
        checkoutOptions={{
          orgId: '',
          lotId: '',
          quantity: 1,
          collectionItemId: '',
          invoiceId: '',
          vertexEnabled: true,
          successURL: 'http://localhost:3000/payments/success/?from=coinbase',
          errorURL: 'http://localhost:3000/payments/error/?from=coinbase',
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
            // logoSrc: require('../../public/img/logos/sotheby-logo.svg'),
          },
          walletConnect: {
            orgId: '',
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
        show={ show } />
    </div>
  )
}

export default Checkout;