import { Theme } from '@mui/material/styles';

export const getCssClassByTheme = (theme: Theme) => {
    return theme.palette.mode === 'light' ? 'mode-light' : 'mode-dark';
};
