import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

export interface SnackbarState extends CodeMessage {
    severity?: AlertColor;
};
