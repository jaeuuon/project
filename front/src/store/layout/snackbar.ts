import { createSlice } from '@reduxjs/toolkit';

import type { SnackbarState } from 'types/store/layout/snackbar';

const initialState: SnackbarState = { code: '', message: '' };

const { reducer, actions: { success, error } } = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        success: (_state, { payload: { code, message } }) => ({ code, message }),
        error: (_state, { payload: { code, message } }) => ({ severity: 'error', code, message })
    }
});

export default reducer;
export { success, error };
