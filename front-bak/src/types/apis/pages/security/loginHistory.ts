import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

import { COLUMN } from 'enums/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export interface Content extends StringIndex {
    [COLUMN.REQUEST_IP.KEY]: string;
    [COLUMN.RESULT.KEY]: string;
    [COLUMN.CREATED_TIME.KEY]: string;
};
