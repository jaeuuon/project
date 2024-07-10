import { column } from 'enums/apis/pages/security/loginHistory';

import type { Pageable } from 'types/apis/request';
import type { LoginResult } from 'enums/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export interface Content {
    [column.REQUEST_IP.key]: string;
    [column.RESULT.key]: LoginResult;
    [column.CREATED_TIME.key]: string;
};
