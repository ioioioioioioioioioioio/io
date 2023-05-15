import { useAppSelector } from '../redux/hooks';
import { selectTheme } from '../redux/slices/themingSlice';

export type ColorTheme = {
  primary: string;
  secondary: string;
  textSecondary: string;
  textPrimary: string;
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  containerPrimary: string;
  containerSecondary: string;
  containerTertiary: string;
  error: string;
  success: string;
  disabled: string;
  border: string;
  accent: string;
};

const sharedColors = {
  black: '#000000',
  white: '#FFFFFF',
};

type SharedColors = typeof sharedColors;

export type Colors = ColorTheme & SharedColors;

// Light theme
const lightTheme: ColorTheme = {
  primary: '#9b5de5', // a bright purple color
  secondary: '#f15bb5', // a pink color
  accent: '#fee440', // a yellow color
  textPrimary: '#000000', // black
  textSecondary: '#4f4f4f', // dark gray
  backgroundPrimary: '#f0f0f0', // off-white with a hint of gray
  backgroundSecondary: '#dcdcdc', // light gray with a hint of gray
  backgroundTertiary: '#c8c8c8', // lighter gray with a hint of gray
  containerPrimary: '#ffffff', // white
  containerSecondary: '#f0f0f0', // light gray
  containerTertiary: '#e0e0e0', // lighter gray
  error: '#ff3b30', // red
  success: '#34c759', // green
  disabled: '#8e8e93', // gray
  border: '#000000', // black
};

// Dark theme
const darkTheme: ColorTheme = {
  primary: '#6a2c70', // a dark purple color
  secondary: '#b83b5e', // a dark pink color
  accent: '#ffbe0b', // an orange color
  textPrimary: '#ffffff', // white
  textSecondary: '#b3b3b3', // light gray
  backgroundPrimary: '#121212', // very dark gray
  backgroundSecondary: '#212121', // dark gray
  backgroundTertiary: '#313131', // darker gray
  containerPrimary: '#2d2d2d', // dark gray with a hint of purple
  containerSecondary: '#3d3d3d', // darker gray with a hint of purple
  containerTertiary: '#4d4d4d', // even darker gray with a hint of purple
  error: '#ff453a', // red
  success: '#32d74b', // green
  disabled: '#636366', // gray
  border: '#ffffff', // white
};

export default function useTheme(): ColorTheme {
  const theme = useAppSelector((state) => selectTheme(state));
  return theme === 'light' ? lightTheme : darkTheme;
}
