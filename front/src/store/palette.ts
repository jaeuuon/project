import { createSlice } from '@reduxjs/toolkit';

import type { PaletteState } from 'types/store/palette';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initialState: PaletteState = { mode: getMql().matches ? 'light' : 'dark' };

const { reducer, actions } = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        light: (_state) => ({ mode: 'light' }),
        dark: (_state) => ({ mode: 'dark' })
    }
});

export default reducer;
export const { light, dark } = actions;
