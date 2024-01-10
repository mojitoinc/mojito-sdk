import '@mui/material/styles';
import { SecondaryTheme } from './SecondaryTheme';

declare module '@mui/material/styles' {
  export interface Palette {
    appDefaultColor?: {
      primary?: SecondaryTheme,
      secondary?: SecondaryTheme
    }
    backgroundColor?: {
      primary?: string
      secondary?: string
    }
    border?: SecondaryTheme
    toastError?: ColorPartial
    toastSuccess?: ColorPartial
    toastWarning?: ColorPartial
  }
  // allow configuration using `createTheme`
  export interface PaletteOptions {
    appDefaultColor?: {
      primary?: SecondaryTheme,
      secondary?: SecondaryTheme
    }
    backgroundColor?: {
      primary?: string
      secondary?: string
    }
    border?: SecondaryTheme
    toastError?: ColorPartial
    toastSuccess?: ColorPartial
    toastWarning?: ColorPartial
    iconColor?: string
  }
}
