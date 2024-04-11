import { Roles } from '../enums/roles';

import { Action } from '../types/action';
import { User } from '../types/user';

const SET = 'user/SET';

export const set = (user: User): Action => ({ type: SET, data: user });

const initState: User = {
    id: null,
    name: null,
    role: null
};

export default (state = initState, action: Action) => {
    switch (action.type) {
        case SET:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};
