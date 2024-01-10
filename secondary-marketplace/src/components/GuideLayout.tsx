import React from 'react';
import { Typography, Box, Button, Grid, Divider, TextField, Stack } from '@mui/material';
import RadioButton from './RadioButton';

interface GuideLayoutProps {
  title: string;
  value?: string;
  optionOne?: string;
  optionTwo?: string;
  isRadioButton?: boolean;
  isDetailPage?: boolean;
  orderId?: string;
  isOrderId?: boolean;
  question?: string;
  answer?: string;
  onClickModal: () => void;
  onClickDocument: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeOrderId?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GuideLayout = ({
  title, value, optionTwo, optionOne, isRadioButton, isDetailPage, isOrderId, orderId, question, answer, onChange, onClickModal, onChangeOrderId, onClickDocument,
}: GuideLayoutProps) => {
  return (
    <Box>
      <Grid container spacing={ 4 }>
        <Grid item xs={ 12 } sm={ 12 } lg={ 6 } sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography sx={{ marginBottom: '20px', fontSize: '20px' }}>{ title }</Typography>
          { isRadioButton && (
            <RadioButton value={ value } onChange={ onChange } optionOne={ optionOne } optionTwo={ optionTwo } />
          ) }
          { isOrderId && (
            <TextField sx={{ marginBottom: '20px' }} value={ orderId } onChange={ onChangeOrderId } id="outlined-basic" label="Order id" variant="outlined" />
          ) }
          { !isDetailPage && (
            <Button onClick={ onClickModal }>Open Modal</Button>
          ) }
          { isDetailPage && (
            <Typography>The PDP within the Secondary Marketplace SDK provides users with detailed information about a specific NFT. It showcases essential details such as provenance, metadata, network details, offers, and traits. This page acts as a comprehensive reference for users before making a purchase decision.</Typography>
          ) }
        </Grid>
        <Grid item xs={ 12 } sm={ 12 } lg={ 6 }>
          { !isDetailPage && (
            <>
              <Typography sx={{ marginBottom: '10px' }}>{ question }</Typography>
              <Typography>{ answer }</Typography>
              <Stack direction={{ xs: 'column', sm: 'column', lg: 'row', md: 'column', xl: 'row' }} spacing={ 1 } sx={{ marginTop: '20px' }}>
                <Typography>complete documentation for the SMP :</Typography>
                <Typography onClick={ onClickDocument } sx={{ textDecorationLine: 'underline', color: 'blue', cursor: 'pointer' }}>click here</Typography>
              </Stack>
            </>
          ) }
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: '#E0E0E0', marginTop: '40px', marginBottom: '20px' }} />
    </Box>
  );
};

export default GuideLayout;
