import { combineReducers } from 'redux';

import user from 'modules/layout/header/user';
import mode from 'modules/layout/header/mode';
import sidebar from 'modules/layout/main/sidebar';
import snackbar from 'modules/layout/snackbar';

const rootReducer = combineReducers({
    user,
    mode,
    sidebar,
    snackbar
});

export default rootReducer;
