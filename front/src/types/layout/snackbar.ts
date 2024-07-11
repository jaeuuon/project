import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

import { setSnackbarError, setSnackbarSuccess } from 'modules/layout/snackbar';

export interface Snackbar {
    severity?: AlertColor;
    codeMessage?: CodeMessage;
};

export type Action =
    | ReturnType<typeof setSnackbarError>
    | ReturnType<typeof setSnackbarSuccess>;
