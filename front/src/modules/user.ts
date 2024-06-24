import type User from 'types/user';

const initState: User = {
    id: undefined,
    email: undefined,
    name: undefined,
    roles: [],
    exp: undefined
};

const action = {
    SET: 'user/SET'
} as const;

export const set = (user: User) => ({ type: action.SET, payload: user });

type Action =
    | ReturnType<typeof set>;

const user = (state: User = initState, { type, payload }: Action) => {
    switch (type) {
        case action.SET:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default user;
