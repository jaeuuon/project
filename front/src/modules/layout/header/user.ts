import { action } from 'enums/layout/header/user';

import type { User } from 'types/layout/header/user';
import type { Action } from 'types/layout/header/user';

const initState: User = { isInit: false };

export const initUser = () => ({ type: action.INIT, payload: { ...initState, isInit: true } });
export const setUser = (user: User) => ({ type: action.SET, payload: user });

const user = (state: User = initState, { type, payload }: Action) => {
    switch (type) {
        case action.INIT:
            return { ...payload };
        case action.SET:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default user;
