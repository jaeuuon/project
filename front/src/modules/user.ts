import User from '../types/user';

const initState: User = {};

const SET = 'user/SET' as const;

export const set = (user: User) => ({ type: SET, payload: user });

type Action = 
    | ReturnType<typeof set>;

const user = (state: User = initState, action: Action) => {
    switch (action.type) {
        case SET:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default user;
