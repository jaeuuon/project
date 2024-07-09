import type { Input } from 'types/apis/request';

export interface Params extends Input {
    email?: string;
    password?: string;
};

export interface Content {
    access: string;
};
