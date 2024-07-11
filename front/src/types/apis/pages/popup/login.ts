import type { IndexString } from 'types/signature';

export interface Params extends IndexString {
    email?: string;
    password?: string;
};

export interface Content {
    access: string;
};
