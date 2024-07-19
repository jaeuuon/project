import { createSlice } from '@reduxjs/toolkit';

import type { ModeState } from 'types/layout/header/mode';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initialState: ModeState = { value: getMql().matches ? 'light' : 'dark' };

const modeSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        light: (_state) => ({ value: 'light' }),
        dark: (_state) => ({ value: 'dark' })
    }
});

export default modeSlice.reducer;
export const { light, dark } = modeSlice.actions;
