import type { StringIndex } from 'types/signature';

export interface Params extends StringIndex {
    email?: string;
    password?: string;
};

export interface Content {
    access: string;
};
