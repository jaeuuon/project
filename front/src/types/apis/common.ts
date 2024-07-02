import type { Status } from 'enums/apis/status';

export interface Input {
    [index: string | symbol]: string | undefined;
};

export default interface Response {
    path: string;
    method: string;
    status: Status;
    data: Data;
    timestamp: string;
};

export interface Data extends CodeMessage {
    content: any[];
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
