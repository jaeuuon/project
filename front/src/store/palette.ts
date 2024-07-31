import { createSlice } from '@reduxjs/toolkit';

import type { PaletteState } from 'types/store/palette';

export const mql = window.matchMedia("(prefers-color-scheme: light)");

const initialState: PaletteState = { mode: mql.matches ? 'light' : 'dark' };

const { reducer, actions: { light, dark } } = createSlice({
    name: 'palette',
    initialState,
    reducers: {
        light: (_state) => ({ mode: 'light' }),
        dark: (_state) => ({ mode: 'dark' })
    }
});

export default reducer;
export { light, dark };
