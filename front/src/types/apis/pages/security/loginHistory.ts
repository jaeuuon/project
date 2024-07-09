import type { Pageable } from 'types/apis/request';
import type { LoginResult } from 'enums/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export interface Content {
    requestIp: string;
    result: LoginResult;
    createdTime: string;
};
