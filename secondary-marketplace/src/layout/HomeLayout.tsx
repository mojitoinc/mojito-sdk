import React from 'react';
import { Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface HomeLayoutProps {
  tokenId: string;
  contractAddress: string;
  itemId: string;
  onChangeTokenId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContractAddress: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeItemId: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HomeLayout = ({
  tokenId,
  contractAddress,
  itemId,
  onChangeTokenId,
  onChangeContractAddress,
  onChangeItemId,
}: HomeLayoutProps) => {
  return (
    <>
      <Box sx={{ margin: '20px 0px 0px 40px' }}>
        <Typography sx={{ marginBottom: '16px' }}>Token details</Typography>
        <TextField value={ tokenId } onChange={ onChangeTokenId } id="outlined-basic" label="Token id" variant="outlined" />
        <TextField value={ contractAddress } onChange={ onChangeContractAddress } sx={{ marginLeft: 10 }} id="outlined-basic" label="Contract address" variant="outlined" />
        <TextField value={ itemId } onChange={ onChangeItemId } sx={{ marginLeft: 10 }} id="outlined-basic" label="item id" variant="outlined" />
        { (!tokenId || !contractAddress || !itemId) && (
          <Typography sx={{ color: 'red', marginTop: '10px' }}>Note: Please fill all the fields to continue</Typography>
        ) }
      </Box>
    </>
  );
};

export default HomeLayout;
