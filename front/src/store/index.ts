import { configureStore } from '@reduxjs/toolkit';

import user from 'store/layout/header/user';
import mode from 'store/layout/header/mode';
import subMenu from 'store/layout/main/subMenu';
import snackbar from 'store/layout/snackbar';

export const store = configureStore({
    reducer: {
        user,
        mode,
        subMenu,
        snackbar
    }
});
