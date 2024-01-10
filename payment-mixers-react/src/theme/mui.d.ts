import '@mui/material/styles';
import { ColorPartial } from '@mui/material/styles';

declare module '@mui/material/styles' {
  export interface Palette {
    backgroundColor?: {
      primary?: string
      secondary?: string
    }
    toastError?: ColorPartial
    toastSuccess?: ColorPartial
    toastWarning?: ColorPartial
    iconColor?: string
  }
  // allow configuration using `createTheme`
  export interface PaletteOptions {
    backgroundColor?: {
      primary?: string
      secondary?: string
    }
    toastError?: ColorPartial
    toastSuccess?: ColorPartial
    toastWarning?: ColorPartial
    iconColor?: string
  }
}