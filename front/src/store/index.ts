import { configureStore } from '@reduxjs/toolkit';

import snackbarReducer from 'store/layout/snackbar';

const store = configureStore({
    reducer: {
        snackbar: snackbarReducer
    }
});

export default store;
