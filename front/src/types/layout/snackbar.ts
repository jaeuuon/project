import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

export default interface Snackbar {
    severity?: AlertColor;
    codeMessage?: CodeMessage;
};
