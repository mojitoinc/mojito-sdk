import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { WalletDetailsData } from '@/interface';


interface WalletLayoutProps {
  walletDetails: WalletDetailsData;
  onClickModal: () => void;
  onClickDisconnect: () => void;
}

const WalletLayout = ({
  walletDetails,
  onClickModal,
  onClickDisconnect,
}: WalletLayoutProps) => {
  return (
    <>
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Typography variant='h4'>Connect Your wallet</Typography>
      </Box>
      { walletDetails.walletAddress ? (
        <Box sx={{ margin: '20px 0px 0px 40px' }}>
          <Button onClick={ onClickDisconnect }>disconnect</Button>
        </Box>
      ) : (
        <Box sx={{ margin: '20px 0px 0px 40px' }}>
          <Button onClick={ onClickModal }>Connect wallet</Button>
        </Box>
      ) }
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Typography>Wallet Address: { walletDetails.walletAddress || 'No data' }</Typography>
      </Box>
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Typography>Native Balance: { walletDetails.balance.native || 0 }</Typography>
        <Typography>Non-Native Balance: { walletDetails.balance.nonNative || 0 }</Typography>
      </Box>
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Typography>Chain Id: { walletDetails.networkDetails.chainID || '0' }</Typography>
      </Box>
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Typography>Provider type: { walletDetails.providerType || 'No data' }</Typography>
      </Box>
    </>
  );
};

export default WalletLayout;
