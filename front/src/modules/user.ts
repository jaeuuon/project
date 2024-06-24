import type User from 'types/user';

const initState: User = {
    id: undefined,
    email: undefined,
    name: undefined,
    roles: [],
    exp: 0
};

const action = {
    INIT: 'user/INIT',
    SET: 'user/SET'
} as const;

export const init = () => ({ type: action.INIT, payload: initState });
export const set = (user: User) => ({ type: action.SET, payload: user });

type Action =
    | ReturnType<typeof init>
    | ReturnType<typeof set>;

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
