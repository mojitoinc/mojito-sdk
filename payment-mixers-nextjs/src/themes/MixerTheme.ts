import { ThemeConfiguration } from '@mojito-inc/mixers';

export const MojitoMixerTheme: ThemeConfiguration = {
    font: {
      primary: 'Sneak',
      secondary: 'Sneak',
    },
    color: {
      primary: '#6663FD',
      secondary: '#FFFFFF',
      background: '#FAFAFC',
      errorBackground: '#FEE3E5',
      text: '#000000',
      cardBackground: '#FFFFFF',
      borderColor: '',
      radioCheckedColor: '',
      paymentConfirmation: {
        processedBackground: '',
        processedTextColor: 'string',
        awaitingPaymentBackground: '',
        awaitingPaymentTextColor: '',
        copyIconColor: '',
      },
      checkout: {
        continueButtonBackground: '#6663FD',
        continueButtonTextColor: '#FFFFFF',
        disableButtonBackground: '#DADAE9',
        continueButtonBorderColor: '#6663FD',
      },
      placeholder: '#BABEC5',
      costBreakdown: {
        applyButtonBackground: '#DADAE9',
        applyButtonTextColor: '#FFFFFF',
        disclaimerBackground: '#DADAE9',
      },
    },
  };