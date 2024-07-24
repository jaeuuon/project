import { createSlice } from '@reduxjs/toolkit';

import type { SidebarState } from 'types/layout/main/sidebar';

const initialState: SidebarState = { isVisible: false };

const sidebarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        open: (_state) => ({ isVisible: true }),
        close: (_state) => ({ isVisible: false })
    }
});

export const sidebar = sidebarSlice.reducer;
export const { open, close } = sidebarSlice.actions;
