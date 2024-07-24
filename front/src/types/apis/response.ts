import type { Union } from 'types/union';

import { status } from 'enums/apis/response';

export type Status = Union<typeof status>;

export interface CodeMessage {
    code: string;
    message: string;
};

export interface Data<T> extends CodeMessage {
    content: T[];
    elements: number;
    totalElements: number;
    size: number;
    page: number;
    totalPages: number;
};

export interface Response<T> {
    path: string;
    method: string;
    status: Status;
    data: Data<T>;
    timestamp: string;
};
