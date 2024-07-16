import { combineReducers } from 'redux';

import user from 'modules/layout/header/user';
import paletteMode from 'modules/layout/header/paletteMode';
import sidebar from 'modules/layout/main/sidebar';
import snackbar from 'modules/layout/snackbar';

const reducer = combineReducers({
    user,
    paletteMode,
    sidebar,
    snackbar
});

export default reducer;
