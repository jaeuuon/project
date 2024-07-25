import type { Pageable } from 'types/apis/request';
import type { StringIndex } from 'types/signature';

import { COLUMN } from 'constants/apis/pages/security/loginHistory';

export interface Params extends Pageable {};

export interface Content extends StringIndex {
    [COLUMN.REQUEST_IP]: string;
    [COLUMN.RESULT_CODE]: string;
    [COLUMN.RESULT_VALUE]: string;
    [COLUMN.CREATED_TIME]: string;
};
