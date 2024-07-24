import type { CodeMessage as CodeMessageType } from 'types/apis/response';

export type Severity = 'primary' | 'warning' | 'error';

export interface CodeMessage {
    [index: string]: CodeMessageType;
};
