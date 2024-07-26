import { createSlice } from '@reduxjs/toolkit';

import type { ModeState } from 'types/layout/header/mode';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initialState: ModeState = { value: getMql().matches ? 'light' : 'dark' };

const { reducer, actions } = createSlice({
    name: 'mode',
    initialState,
    reducers: {
        light: (_state) => ({ value: 'light' }),
        dark: (_state) => ({ value: 'dark' })
    }
});

export default reducer;
export const { light, dark } = actions;
