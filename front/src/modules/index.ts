import { combineReducers } from 'redux';

import user from 'modules/layout/header/user';
import snackbar from 'modules/layout/snackbar';

const rootReducer = combineReducers({
    user,
    snackbar
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
