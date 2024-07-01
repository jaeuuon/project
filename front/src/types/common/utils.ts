import type { CodeMessage } from 'types/apis/common';

export interface CodeMessageError {
    [index: string]: CodeMessage;
}

export type SearchCode = string | undefined;
