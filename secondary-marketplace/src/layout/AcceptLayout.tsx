import React from 'react';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface AcceptLayoutProps {
  id: string;
  buyerAddress: string;
  offerExpiryDate: string;
  fixedPrice: string;
  orderStatus: string;
  cryptoPrice: string;
  usdPrice: string;
  onChangeOffer: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AcceptLayout = ({
  id,
  buyerAddress,
  offerExpiryDate,
  fixedPrice,
  orderStatus,
  cryptoPrice,
  usdPrice,
  onChangeOffer,
}: AcceptLayoutProps) => {
  return (
    <>
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Box sx={{ marginBottom: '20px' }}>
            <Typography sx={{ marginBottom: '16px' }}>Offer details</Typography>
            <TextField name="id" value={ id } onChange={ onChangeOffer } id="outlined-basic" label="Id" variant="outlined" />
            <TextField name="buyerAddress" value={ buyerAddress } onChange={ onChangeOffer } sx={{ marginLeft: 10 }} id="outlined-basic" label="Buyer address" variant="outlined" />
            <TextField name="offerExpiryDate" value={ offerExpiryDate } onChange={ onChangeOffer } sx={{ marginLeft: 10 }} id="outlined-basic" label="Expiry date" variant="outlined" />
        </Box>
        <Box>
            <TextField name="fixedPrice" value={ fixedPrice } onChange={ onChangeOffer } id="outlined-basic" label="Fixed Price" variant="outlined" />
            <TextField name="orderStatus" value={ orderStatus } onChange={ onChangeOffer } sx={{ marginLeft: 10 }} id="outlined-basic" label="Order Status" variant="outlined" />
            <TextField name="usdPrice" value={ usdPrice } onChange={ onChangeOffer } sx={{ marginLeft: 10 }} id="outlined-basic" label="USD Price" variant="outlined" />
            <TextField name="cryptoPrice" value={ cryptoPrice } onChange={ onChangeOffer } sx={{ marginLeft: 10 }} id="outlined-basic" label="Crypto Price" variant="outlined" />
        </Box>
      </Box>
    </>
  );
};

export default AcceptLayout;
