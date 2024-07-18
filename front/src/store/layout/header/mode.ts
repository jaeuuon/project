import { createSlice } from '@reduxjs/toolkit';

import type { PaletteMode } from '@mui/material';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initialState: PaletteMode = getMql().matches ? 'light' : 'dark';

const modeSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        light: (state) => { state = 'light'; },
        dark: (state) => { state = 'dark'; }
    }
});

export default modeSlice.reducer;
export const { light, dark } = modeSlice.actions;
