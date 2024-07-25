import type { ValueOf } from 'types/union';

import { ROLE } from 'constants/layout/header/user';

export interface Roles {
    code: ValueOf<typeof ROLE>;
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
