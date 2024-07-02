import { combineReducers } from 'redux';

import user from 'modules/layout/header/user';
import mode from 'modules/layout/header/mode';
import snackbar from 'modules/layout/snackbar';

const rootReducer = combineReducers({
    user,
    mode,
    snackbar
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
