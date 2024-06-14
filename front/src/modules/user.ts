import type User from '../types/user';

const initState: User = {
    email: '',
    password: ''
};

const SET = 'user/SET' as const;

export const set = (user: User) => ({ type: SET, payload: user });

type Action = 
    | ReturnType<typeof set>;

const user = (state: User = initState, { type, payload }: Action) => {
    switch (type) {
        case SET:
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default user;
