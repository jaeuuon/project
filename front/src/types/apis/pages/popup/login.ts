import type Input from 'types/apis/input';

export interface Params extends Input {
    email?: string;
    password?: string;
};

export default interface Content {
    access: string;
};
