import type { Pageable } from 'types/apis/request';
import type { Union } from 'types/union';
import type { StringIndex } from 'types/signature';

import { loginResult, column } from 'enums/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export type LoginResult = Union<typeof loginResult>;

export interface Content extends StringIndex {
    [column.REQUEST_IP.key]: string;
    [column.RESULT.key]: LoginResult;
    [column.CREATED_TIME.key]: string;
};
