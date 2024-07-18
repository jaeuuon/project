import { createSlice } from '@reduxjs/toolkit';

import type { SnackbarState } from 'types/layout/snackbar';

const initialState: SnackbarState = {};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        success: ({ severity, codeMessage }, { payload }) => {
            severity = 'success';
            codeMessage = payload;
        },
        error: ({ severity, codeMessage }, { payload }) => {
            severity = 'error';
            codeMessage = payload;
        }
    }
});

export default snackbarSlice.reducer;
export const { success, error } = snackbarSlice.actions;
