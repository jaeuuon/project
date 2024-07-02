import type { CodeMessage } from 'types/apis/common';

export interface CodeMessageEnum {
    [index: string]: CodeMessage;
}

export type SearchCode = string | undefined;
