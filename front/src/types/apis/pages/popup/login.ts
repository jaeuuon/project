import type Input from 'types/apis/input';

export interface Params extends Input {
    email?: string;
    password?: string;
};

export interface Content {
    access: string;
};
