import { createSlice } from '@reduxjs/toolkit';

import type { UserState } from 'types/layout/header/user';

const initialState: UserState = { isInit: false, roles: [] };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (_state) => ({ ...initialState, isInit: true }),
        set: (state, { payload }) => ({ ...state, ...payload })
    }
});

export default userSlice.reducer;
export const { init, set } = userSlice.actions;
