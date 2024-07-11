import { column } from 'enums/apis/pages/security/loginHistory';

import type { Pageable } from 'types/apis/request';
import type { IndexString } from 'types/signature';
import type { LoginResult } from 'enums/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export interface Content extends IndexString {
    [column.REQUEST_IP.key]: string;
    [column.RESULT.key]: LoginResult;
    [column.CREATED_TIME.key]: string;
};
