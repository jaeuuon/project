import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

import { column } from 'enums/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export interface Content extends StringIndex {
    [column.REQUEST_IP.key]: string;
    [column.RESULT.key]: string;
    [column.CREATED_TIME.key]: string;
};
