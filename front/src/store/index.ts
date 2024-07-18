import { configureStore } from '@reduxjs/toolkit';

import user from 'store/layout/header/user';
import sidebar from 'store/layout/main/sidebar';
import snackbar from 'store/layout/snackbar';

const store = configureStore({
    reducer: {
        user,
        sidebar,
        snackbar
    }
});

export default store;
