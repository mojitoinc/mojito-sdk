import React from 'react';
import { Typography, TextField, Stack, Box } from '@mui/material';

interface TokenInputProps {
  tokenId: string;
  contractAddress: string;
  itemId?: string;
  showItemId: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TokenInput = ({
  tokenId,
  contractAddress,
  itemId,
  showItemId,
  onChange,
}: TokenInputProps) => {
  return (
    <Box>
      <Typography sx={{ marginBottom: '16px' }}>Custom Token details</Typography>
      <Stack spacing={ 2 } direction={{ xs: 'column', sm: 'column', lg: 'row', md: 'column', xl: 'row' }}>
        <TextField name="tokenId" value={ tokenId } onChange={ onChange } id="outlined-basic" label="Token id" variant="outlined" />
        <TextField name="contractAddress" value={ contractAddress } onChange={ onChange } id="outlined-basic" label="Contract address" variant="outlined" />
        { showItemId && <TextField name="itemId" value={ itemId } onChange={ onChange } id="outlined-basic" label="item id" variant="outlined" /> }
      </Stack>
    </Box>
  );
};

export default TokenInput;
