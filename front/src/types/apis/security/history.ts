import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

export interface LoginParams extends Pageable {};

export interface LoginContent extends StringIndex {
    requestIp: string;
    result: {
        code: string;
        value: string;
    };
    createdTime: string;
};
