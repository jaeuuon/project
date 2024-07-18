import type { User, Action } from 'types/layout/header/user';

import { action } from 'enums/layout/header/user';

const initState: User = { isInit: false, roles: [] };

export const set = (user: User) => ({ type: action.SET, payload: user });
export const init = () => ({ type: action.INIT, payload: { ...initState, isInit: true } });

const user = (state: User = initState, { type, payload }: Action) => {
    switch (type) {
        case action.SET:
            return { ...state, ...payload };
        case action.INIT:
            return { ...payload };
        default:
            return state;
    }
};

export default user;
