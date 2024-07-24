import type { Union } from 'types/union';

import { ROLE } from 'enums/layout/header/user';

export interface Roles {
    code: Union<typeof ROLE>;
    value: string;
};

export interface UserState {
    id?: number;
    email?: string;
    name?: string;
    roles: Roles[];
    exp?: number;
    isInit: boolean;
};
