import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

export interface Params extends Pageable {};

export interface Content extends StringIndex {
    id: number;
    email: string;
    name: string;
};
