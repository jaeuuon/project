import { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/common';

export default interface LogInOut {
    setSeverity: (severity: AlertColor) => void;
    setCodeMessage: (codeMessage: CodeMessage) => void;
    setVisibleLoginTrue: () => void;
};
