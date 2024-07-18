import type { Snackbar, Action } from 'types/layout/snackbar';
import type { CodeMessage } from 'types/apis/response';

import { action } from 'enums/layout/snackbar'; 

const initState: Snackbar = {};

export const setSuccess = (codeMessage: CodeMessage) => ({ type: action.SET_SUCCESS, payload: codeMessage });
export const setError = (codeMessage: CodeMessage) => ({ type: action.SET_ERROR, payload: codeMessage });

const snackbar = (state: Snackbar = initState, { type, payload }: Action): Snackbar => {
    switch (type) {
        case action.SET_SUCCESS:
            return { severity: 'success', codeMessage: payload };
        case action.SET_ERROR:
            return { severity: 'error', codeMessage: payload };
        default:
            return state;
    }
};

export default snackbar;
