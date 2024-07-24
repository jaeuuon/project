import { createSlice } from '@reduxjs/toolkit';

import type { UserState } from 'types/layout/header/user';

const initialState: UserState = { roles: [], isInit: false };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        init: (_state) => ({ ...initialState, isInit: true }),
        set: (state, { payload }) => ({ ...state, ...payload })
    }
});

export const user = userSlice.reducer;
export const { init, set } = userSlice.actions;
