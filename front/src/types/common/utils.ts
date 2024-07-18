import type { CodeMessage as CodeMessageType } from 'types/apis/response';

export interface CodeMessage {
    [index: string]: CodeMessageType;
}

export type SearchCode = string | undefined;
