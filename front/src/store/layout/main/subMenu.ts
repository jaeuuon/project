import { createSlice } from '@reduxjs/toolkit';

import type { SubMenuState } from 'types/store/layout/main/subMenu';

const initialState: SubMenuState = { isVisible: false };

const { reducer, actions: { open, close } } = createSlice({
    name: 'subMenu',
    initialState,
    reducers: {
        open: (_state) => ({ isVisible: true }),
        close: (_state) => ({ isVisible: false })
    }
});

export default reducer;
export { open, close };
