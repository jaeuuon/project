import type { CodeMessage } from 'types/apis/response';

export type Severity = 'primary' | 'warning' | 'error';

export interface ConstCodeMessage {
    [index: string]: CodeMessage;
};
