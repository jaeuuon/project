import type { CodeMessage } from 'types/apis/response';

export interface CodeMessageEnum {
    [index: string]: CodeMessage;
}

export type SearchCode = string | undefined;
