import type { ValueOf } from 'types/union';

import { STATUS } from 'constants/apis/response';

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
    status: ValueOf<typeof STATUS>;
    data: Data<T>;
    timestamp: string;
};
