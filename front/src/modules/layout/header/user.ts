import type { User } from 'types/layout/header/user';

const initState: User = {};

const action = {
    INIT: 'user/init',
    SET: 'user/set'
} as const;

export const initUser = () => ({ type: action.INIT, payload: initState });
export const setUser = (user: User) => ({ type: action.SET, payload: user });

type Action =
    | ReturnType<typeof initUser>
    | ReturnType<typeof setUser>;

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
