import type Snackbar from 'types/layout/snackbar';
import type { CodeMessage } from 'types/apis/common';

const initState: Snackbar = {};

const action = {
    SET_ERROR: 'snackbar/setError',
    SET_SUCCESS: 'snackbar/setSuccess'
} as const;

export const setSnackbarError = (codeMessage: CodeMessage) => ({ type: action.SET_ERROR, payload: codeMessage });
export const setSnackbarSuccess = (codeMessage: CodeMessage) => ({ type: action.SET_SUCCESS, payload: codeMessage });

type Action =
    | ReturnType<typeof setSnackbarError>
    | ReturnType<typeof setSnackbarSuccess>;

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
