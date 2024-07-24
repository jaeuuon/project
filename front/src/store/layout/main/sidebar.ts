import { createSlice } from '@reduxjs/toolkit';

import type { SidebarState } from 'types/layout/main/sidebar';

const initialState: SidebarState = { isVisible: false };

const { reducer, actions } = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        open: (_state) => ({ isVisible: true }),
        close: (_state) => ({ isVisible: false })
    }
});

export default reducer;
export const { open, close } = actions;
