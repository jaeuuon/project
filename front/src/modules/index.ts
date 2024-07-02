import { combineReducers } from 'redux';

import user from 'modules/layout/header/user';

const rootReducer = combineReducers({ user });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
