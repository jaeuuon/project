import type { AlertColor } from '@mui/material';
import type { VisibleFalse } from 'types/visible';

export interface Severity {
    severity?: AlertColor;
};

export default interface Alert extends Severity, VisibleFalse {};
