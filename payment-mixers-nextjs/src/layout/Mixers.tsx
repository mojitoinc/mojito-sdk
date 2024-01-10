import React, { useEffect, useMemo, useState } from "react";
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
          uri="https://api-stg.mojito.xyz/query"
          userInfo={{
            email: "test@gmail.com",
          }}
          checkoutOptions={{
            orgId: "d086ea16-d40d-454c-84a4-64b5e940670a",
            lotId: "f9d22f90-bbec-40e7-a0da-866bfe589247",
            quantity: 1,
            vertexEnabled: true,
            collectionItemId: "7d1b9193-9bb7-4b63-ae76-ddcfe4878172",
          }}
          customTheme={MojitoMixerTheme}
          uiConfiguration={{
            walletOptions: {
              enableEmail: true,
              enableMetamask: true,
              enableWalletConnect: true,
            },
            delivery: {
              creditCard: {
                enableMultiSig: false,
                checkoutApiKey: "pk_sbox_snvdtl3vfybgh7msvch7ni2gpan",
              },
            },
            payment: {
              creditCard: true,
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
              orgId: "d086ea16-d40d-454c-84a4-64b5e940670a",
              paperClientId: "659af8f3-6a4f-4f53-8936-ba0fa32b0db0",
              walletConnectProjectId: "89dbf545d9dfa635307b233d7b4ce5d4",
              isWeb2Login: true,
              skipSignature: false,
            },
          }}
          success={false}
          show={show}
          token={bearerToken}
          debug={false}
        />
      )}
    </div>
  );
};

export default MixersLayout;
