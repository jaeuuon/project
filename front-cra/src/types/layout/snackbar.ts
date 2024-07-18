import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

import { setSuccess, setError } from 'modules/layout/snackbar';

export interface Snackbar {
    severity?: AlertColor;
    codeMessage?: CodeMessage;
};

export type Action =
    | ReturnType<typeof setSuccess>
    | ReturnType<typeof setError>
;
