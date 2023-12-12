import React, { useState } from "react";
import { MojitoCheckout } from "@mojito-inc/mixers";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { MojitoMixerTheme } from '../themes/MixerTheme';

const MixersLayout = () => {
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

  const getAuthenticationToken = async () => {
    const token = await getIdTokenClaims();
    console.log("token", token);
    // eslint-disable-next-line no-underscore-dangle
    return token ? `${token?.__raw}` : "";
  };

  return (
    <div>
      <Button disabled={ isLoading } onClick={onClickLogin}>
        {isLoading ? 'Loading...' : isAuthenticated ? "Logout" : "Login"}
      </Button>
      <Button disabled={!isAuthenticated || isLoading} onClick={openModal}>
        Open Mixers
      </Button>
      {isAuthenticated && (
        <MojitoCheckout
          uri="https://api-sandbox.mojito.xyz/query"
          userInfo={{
            email: "test@gmail.com",
          }}
          checkoutOptions={{
            orgId: "77843c1f-231a-4452-b041-5b6389fd014f",
            lotId: "2c2bb617-1581-40a6-a04c-dd9a128f9d5b",
            quantity: 1,
            vertexEnabled: true,
            collectionItemId: "3e0cca87-8d88-45d3-a287-da94fce59b55",
            // errorURL: `${window.location.origin}/payments/error`,
            // successURL: `${window.location.origin}/payments/success`,
            invoiceId: 'c10fa187-34fb-4b74-acd6-16f94d18e574"',
          }}
          customTheme={MojitoMixerTheme}
          enableSardine={false}
          uiConfiguration={{
            walletOptions: {
              enableEmail: true,
              enableMetamask: true,
              enableWalletConnect: true,
            },
            delivery: {
              creditCard: {
                enableMultiSig: false,
                enableConnectWallet: true,
                checkoutApiKey: "pk_sbox_snvdtl3vfybgh7msvch7ni2gpan",
              },
            },

            billing: {
              isEnableExpressCheckout: true,
              gpay: true,
              applepay: true,
              walletConnect: true,
              metaMask: true,
            },
            payment: {
              creditCard: true,
              gpay: false,
              applepay: false,
              walletConnect: true,
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
              orgId: "77843c1f-231a-4452-b041-5b6389fd014f",
              paperClientId: "659af8f3-6a4f-4f53-8936-ba0fa32b0db0",
              walletConnectProjectId: "89dbf545d9dfa635307b233d7b4ce5d4",
              isWeb2Login: true,
              skipSignature: false,
            },
          }}
          success={false}
          sardineEnvironment="sandbox"
          show={show}
          getAuthenticationToken={getAuthenticationToken}
          debug={false}
        />
      )}
    </div>
  );
};

export default MixersLayout;
