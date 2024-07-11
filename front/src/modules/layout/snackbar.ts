import { action } from 'enums/layout/snackbar'; 

import type { Snackbar, Action } from 'types/layout/snackbar';
import type { CodeMessage } from 'types/apis/response';

const initState: Snackbar = {};

export const setSnackbarError = (codeMessage: CodeMessage) => ({ type: action.SET_ERROR, payload: codeMessage });
export const setSnackbarSuccess = (codeMessage: CodeMessage) => ({ type: action.SET_SUCCESS, payload: codeMessage });

const snackbar = (state: Snackbar = initState, { type, payload }: Action): Snackbar => {
    switch (type) {
        case action.SET_ERROR:
            return { severity: 'error', codeMessage: payload };
        case action.SET_SUCCESS:
            return { severity: 'success', codeMessage: payload };
        default:
            return state;
    }
};

export default snackbar;
