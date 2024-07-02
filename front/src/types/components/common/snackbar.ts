import { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/common';

export default interface Snackbar {
    severity?: AlertColor;
    codeMessage?: CodeMessage;
};

export interface SnackbarSet {
    setSeverity: (severity: AlertColor) => void;
    setCodeMessage: (codeMessage: CodeMessage) => void;
}
