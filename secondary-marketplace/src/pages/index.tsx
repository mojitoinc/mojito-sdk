import Head from "next/head";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Images } from "@/assets/images";
import { configuration } from "@/config";
import TokenInput from "@/components/TokenInput";
import GuideLayout from "@/components/GuideLayout";
import { AcceptAndRejectOffer, BuyNow, ListItem, MakeOffer } from "@mojito-inc/secondary-market";
import { FAQ } from "@/constants";
import { useTokenForm } from "@/hooks/useTokenForm";
import Context from "@/provider/WalletDetailProvider";

export default function Home() {
  const { walletDetails, setWalletDetails } = useContext(Context);

  const initialState = useMemo(() => {
    return {
      itemId: '',
      tokenId: '',
      contractAddress: '',
    };
  }, []);

  const [values, handleChange] = useTokenForm(initialState);

  const [openListItemModal, setOpenListItemModal] = useState<boolean>(false);
  const [openMakeOfferModal, setOpenMakeOfferModal] = useState<boolean>(false);
  const [openOfferModal, setOpenOfferModal] = useState<boolean>(false);
  const [openBuyNowModal, setOpenBuyNowModal] = useState<boolean>(false);
  const [listItem, setListItem] = useState<string>('List Item');
  const [makeOffer, setMakeOffer] = useState<string>('Make Offer');
  const [acceptOffer, setAcceptOffer] = useState<string>('Accept Offer');
  const [orderId, setOrderId] = useState<string>('');

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

  const onClickModal = useCallback((event: string) => {
    if (event === 'listItem') {
      setOpenListItemModal(true);
    } else if (event === 'buyNow') {
      setOpenBuyNowModal(true);
    } else if (event === 'makeOffer') {
      setOpenMakeOfferModal(true);
    } else if (event === 'acceptOffer') {
      setOpenOfferModal(true);
    }
  }, []);

  const onCloseListItemModal = useCallback(() => {
    setOpenListItemModal(false);
  }, []);

  const onCloseOfferModal = useCallback(() => {
    setOpenOfferModal(false);
  }, []);

  const onCloseMakeOfferModal = useCallback(() => {
    setOpenMakeOfferModal(false);
  }, []);

  const onCloseBuyNowModal = useCallback(() => {
    setOpenBuyNowModal(false);
  }, []);

  const onChangeListItem = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setListItem((event.target as HTMLInputElement).value);
  }, []);

  const onChangeMakeOffer = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMakeOffer((event.target as HTMLInputElement).value);
  }, []);

  const onChangeAcceptOffer = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptOffer((event.target as HTMLInputElement).value);
  }, []);

  const onChangeOrderId = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderId((event.target as HTMLInputElement).value);
  }, []);

  const onClickDocument = useCallback((event: string) => {
    window.open(event, '_blank');
  }, []);

  return (
    <>
      <Head>
        <title>Secondary Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ background: "#fff", padding: { xs: '16px', sm: '16px', lg: '30px' } }}>
        <Box>
          <Typography sx={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#000' }}>Introduction</Typography>
          <Typography sx={{ marginBottom: '20px', color: '#000' }}>The Secondary Marketplace SDK is a powerful platform that enables users to purchase Non-Fungible Tokens (NFTs) using cryptocurrency. This SDK offers a range of functionalities to facilitate seamless transactions within the secondary NFT market. This documentation will focus on the key features of the SDK, including the Product Details Page (PDP), making offers, buying now, accepting offers, rejecting offers, listing items, removing listings, editing listings, and canceling offers.</Typography>
          <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', md: 'column', xl: 'row' }} sx={{ marginBottom: '16px' }} spacing={ 1 }>
            <Typography sx={{ color: '#000' }}>complete documentation for the SMP :</Typography>
            <Typography onClick={ () => onClickDocument('https://developers.mojito.xyz/v2.0/docs/secondary-marketplace-sdk') } sx={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>click here</Typography>
          </Stack>
        </Box>
        <TokenInput
          itemId={ values.itemId }
          tokenId={ values.tokenId }
          contractAddress={ values.contractAddress }
          showItemId
          onChange={ handleChange } />
        <Divider sx={{ borderColor: '#E0E0E0', marginTop: '40px', marginBottom: '20px' }} />
        <GuideLayout
          value={ listItem }
          onChange={ onChangeListItem }
          optionOne="List Item"
          optionTwo="Remove Listing"
          isRadioButton
          title="List Item, Edit Listing, Remove Listing"
          answer={ FAQ.listing.answer }
          question={ FAQ.listing.question }
          onClickDocument={ () => onClickDocument(FAQ.listing.link) }
          onClickModal={ () => onClickModal('listItem') } />
        <ListItem
          open={ openListItemModal }
          image={ ImageData }
          config={ config }
          tokenDetails={{
            onChainTokenID: values.tokenId || '1',
            contractAddress: values.contractAddress || '0x78ffce1a3d5917c5f983207917893795736b47a2',
            itemId: values.itemId || 'f1e2108a-8992-4d66-9914-01938215e876',
          }}
          isRemoveListing={ listItem === 'Remove Listing' }
          walletDetails={ walletDetails }
          onClickViewItem={ onCloseListItemModal }
          onClickBackToMarketPlace={ onCloseListItemModal }
          onConnectWallet={ onConnectWallet }
          onCloseModal={ onCloseListItemModal } />
        <GuideLayout
          answer={ FAQ.buyNow.answer }
          question={ FAQ.buyNow.question }
          onClickDocument={ () => onClickDocument(FAQ.buyNow.link) } title="Buy Now" onClickModal={ () => onClickModal('buyNow') } />
        <BuyNow
          open={ openBuyNowModal }
          config={ config }
          image={ ImageData }
          tokenDetails={{
            onChainTokenID: values.tokenId || '1',
            contractAddress: values.contractAddress || '0x78ffce1a3d5917c5f983207917893795736b47a2',
            itemId: values.itemId || 'f1e2108a-8992-4d66-9914-01938215e876',
          }}
          walletDetails={ walletDetails }
          onClickViewItem={ onCloseBuyNowModal }
          onClickBackToMarketPlace={ onCloseBuyNowModal }
          onClickConnectWallet={ onConnectWallet }
          onClickDisconnectWallet={ onClickDisconnectWallet }
          onRefetchBalance={ onRefetchBalance }
          onCloseModal={ onCloseBuyNowModal } />
        <GuideLayout
          title="Make Offer, Cancel Offer"
          value={ makeOffer }
          optionOne="Make Offer"
          optionTwo="Cancel Offer"
          isRadioButton
          answer={ FAQ.makeOffer.answer }
          question={ FAQ.makeOffer.question }
          onChange={ onChangeMakeOffer }
          onClickDocument={ () => onClickDocument(FAQ.makeOffer.link) }
          onClickModal={ () => onClickModal('makeOffer') } />
        <MakeOffer
          open={ openMakeOfferModal }
          config={ config }
          image={ ImageData }
          tokenDetails={{
            onChainTokenID: values.tokenId || '1',
            contractAddress: values.contractAddress || '0x78ffce1a3d5917c5f983207917893795736b47a2',
            itemId: values.itemId || 'f1e2108a-8992-4d66-9914-01938215e876',
          }}
          isCancelOffer={ makeOffer === 'Cancel Offer' }
          walletDetails={ walletDetails }
          onClickViewItem={ onCloseMakeOfferModal }
          onClickBackToMarketPlace={ onCloseMakeOfferModal }
          onRefetchBalance={ onRefetchBalance }
          onConnectWallet={ onConnectWallet }
          onCloseModal={ onCloseMakeOfferModal } />
        <GuideLayout
          value={ acceptOffer }
          optionOne="Accept Offer"
          optionTwo="Reject Offer"
          title="Accept Offer, Reject Offer"
          isRadioButton
          isOrderId
          orderId={ orderId }
          answer={ FAQ.acceptOffer.answer }
          question={ FAQ.acceptOffer.question }
          onChangeOrderId={ onChangeOrderId }
          onChange={ onChangeAcceptOffer }
          onClickDocument={ () => onClickDocument(FAQ.acceptOffer.link) }
          onClickModal={ () => onClickModal('acceptOffer') } />
        <AcceptAndRejectOffer
          open={ openOfferModal }
          config={ config }
          image={ ImageData }
          tokenDetails={{
            onChainTokenID: values.tokenId || '1',
            contractAddress: values.contractAddress || '0x78ffce1a3d5917c5f983207917893795736b47a2',
            itemId: values.itemId || 'f1e2108a-8992-4d66-9914-01938215e876',
          }}
          orderId={ orderId }
          isRejectOffer={ acceptOffer === 'Reject Offer' }
          walletDetails={ walletDetails }
          onClickViewItem={ onCloseOfferModal }
          onClickBackToMarketPlace={ onCloseOfferModal }
          onConnectWallet={ onConnectWallet }
          onCloseModal={ onCloseOfferModal } />
        <Box sx={{ height: '50px' }} />  
      </Box>
    </>
  );
}
