import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

export interface Alert {
    severity?: AlertColor;
    codeMessage: CodeMessage;
};

export default interface Component extends Alert {
    setVisibleFalse?: () => void;
};
