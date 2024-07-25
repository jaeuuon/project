import { createSlice } from '@reduxjs/toolkit';

import type { SubMenuState } from 'types/layout/main/subMenu';

const initialState: SubMenuState = { isVisible: false };

const { reducer, actions } = createSlice({
    name: 'subMenu',
    initialState,
    reducers: {
        open: (_state) => ({ isVisible: true }),
        close: (_state) => ({ isVisible: false })
    }
});

export default reducer;
export const { open, close } = actions;
