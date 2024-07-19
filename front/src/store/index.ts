import { configureStore } from '@reduxjs/toolkit';

import user from 'store/layout/header/user';
import mode from 'store/layout/header/mode';
import sidebar from 'store/layout/main/sidebar';
import snackbar from 'store/layout/snackbar';

const store = configureStore({
    reducer: {
        user,
        mode,
        sidebar,
        snackbar
    }
});

export default store;
