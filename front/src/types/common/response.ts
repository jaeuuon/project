import { Union } from './union';

export const status = {
    SUCCESS: '성공',
    ERROR: '실패'
} as const;

type Status = Union<typeof status>;

export interface Success {
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
    status: Status;
    data: Success;
    errors: Error[];
    timestamp: string;
}
