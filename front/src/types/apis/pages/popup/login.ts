import type { Input } from 'types/components/common';

export interface Params extends Input {
    email?: string;
    password?: string;
};

export default interface Content {
    access: string;
};
