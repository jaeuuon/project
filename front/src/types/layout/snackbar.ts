import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

export interface SnackbarState {
    severity?: AlertColor;
    codeMessage?: CodeMessage;
};
