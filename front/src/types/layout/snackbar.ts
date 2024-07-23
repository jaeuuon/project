import type { Severity } from 'types/components/alert';
import type { CodeMessage } from 'types/apis/response';

export interface SnackbarState extends Severity {
    codeMessage?: CodeMessage;
};
