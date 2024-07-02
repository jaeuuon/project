import { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/common';

export default interface Snackbar {
    severity?: AlertColor;
    codeMessage?: CodeMessage;
};
