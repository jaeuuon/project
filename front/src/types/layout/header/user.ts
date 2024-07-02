import type { Roles } from 'enums/user';

import type CodeValue from 'types/codeValue';

export interface User {
    id?: number;
    email?: string;
    name?: string;
    roles?: CodeValue<Roles>[];
    exp?: number;
};