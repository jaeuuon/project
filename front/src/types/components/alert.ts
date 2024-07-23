import type { AlertColor } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';

export default interface Component {
    severity?: AlertColor;
    codeMessage: CodeMessage;
    setVisibleFalse?: () => void;
};
