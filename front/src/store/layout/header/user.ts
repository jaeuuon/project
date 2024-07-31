import { createSlice } from '@reduxjs/toolkit';

import type { UserState } from 'types/store/layout/header/user';

const initialState: UserState = { roles: [], isInit: false };

const { reducer, actions: { init, set } } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (_state) => ({ ...initialState, isInit: true }),
        set: (state, { payload }) => ({ ...state, ...payload })
    }
});

export default reducer;
export { init, set };
