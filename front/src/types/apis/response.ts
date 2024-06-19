import type { Status } from 'enums/apis/status';

export default interface Response {
    path: string;
    method: string;
    status: Status;
    data: Data;
    errors: Error[];
    timestamp: string;
};

export interface Data {
    code?: string;
    message?: string;
    content: any[];
    elements: number;
    totalElements: number;
    size: number;
    page: number;
    totalPages: number;
};

export interface Error {
    code: string;
    message: string;
};
