import { StatusCode } from '../../enums/common/status';

export interface Data {
    code?: string;
    message?: string;
    content: any[];
    elements: number;
    total_elements: number;
    size: number;
    page: number;
    total_pages: number;
};

export interface Error {
    code: string;
    message: string;
};

export default interface Response {
    path: string;
    method: string;
    status: StatusCode;
    data: Data;
    errors: Error[];
    timestamp: string;
};
