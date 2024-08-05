import { configureStore } from '@reduxjs/toolkit';

import palette from 'store/palette';
import user from 'store/user';
import subMenu from 'store/layout/main/subMenu';
import snackbar from 'store/layout/snackbar';

const store = configureStore({
    reducer: {
        palette,
        user,
        subMenu,
        snackbar
    }
});

export default store;
