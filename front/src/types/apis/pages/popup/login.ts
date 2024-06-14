import type Input from '../../../components/input';

export interface Params extends Input {
    email?: string;
    password?: string;
};

export default interface Content {
    access: string;
    refresh: string;
};
