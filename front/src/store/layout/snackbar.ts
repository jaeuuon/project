import { createSlice } from '@reduxjs/toolkit';

import type { SnackbarState } from 'types/store/layout/snackbar';

const initialState: SnackbarState = {};

const { reducer, actions: { success, error } } = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        success: (_state, { payload }) => ({ codeMessage: payload }),
        error: (_state, { payload }) => ({ severity: 'error', codeMessage: payload })
    }
});

export default reducer;
export { success, error };
