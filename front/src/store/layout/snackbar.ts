import { createSlice } from '@reduxjs/toolkit';

import type { SnackbarState } from 'types/layout/snackbar';

const initialState: SnackbarState = {};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        success: (_state, { payload }) => ({ severity: 'success', codeMessage: payload }),
        error: (_state, { payload }) => ({ severity: 'error', codeMessage: payload })
    }
});

export const snackbar = snackbarSlice.reducer;
export const { success, error } = snackbarSlice.actions;
