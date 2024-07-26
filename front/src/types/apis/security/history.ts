import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

export interface Params extends Pageable {};

interface Result {
    code: string;
    value: string;
};

export interface Content extends StringIndex {
    requestIp: string;
    result: Result;
    createdTime: string;
};
