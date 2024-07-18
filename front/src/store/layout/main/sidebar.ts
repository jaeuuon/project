import { createSlice } from '@reduxjs/toolkit';

import type { SidebarState } from 'types/layout/main/sidebar';

const initialState: SidebarState = { isVisible: false };

const sidebarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        open: ({ isVisible }) => { isVisible = true; },
        close: ({ isVisible }) => { isVisible = false; }
    }
});

export default sidebarSlice.reducer;
export const { open, close } = sidebarSlice.actions;
