import type { Status } from 'enums/apis/status';

export default interface Response<T> {
    path: string;
    method: string;
    status: Status;
    data: Data<T>;
    timestamp: string;
};

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
