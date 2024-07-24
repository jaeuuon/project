import type { Union } from 'types/union';

import { STATUS } from 'enums/apis/response';

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
    status: Union<typeof STATUS>;
    data: Data<T>;
    timestamp: string;
};
