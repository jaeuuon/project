import { status } from 'enums/apis/status';

import type { Union } from 'types/union';

export default interface Response<T> {
    path: string;
    method: string;
    status: Status;
    data: Data<T>;
    timestamp: string;
};

export type Status = Union<typeof status>;

export interface Data<T> extends CodeMessage {
    content: T[];
    elements: number;
    totalElements: number;
    size: number;
    page: number;
    totalPages: number;
};

export interface CodeMessage {
    code: string;
    message: string;
};
