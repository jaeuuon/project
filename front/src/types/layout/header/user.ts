import { roles } from 'enums/layout/header/user';

import type { CodeValue } from 'types/value';
import type { Union } from 'types/union';

import { initUser, setUser } from 'modules/layout/header/user';

export interface User {
    isInit: boolean;
    id?: number;
    email?: string;
    name?: string;
    roles: CodeValue<Roles>[];
    exp?: number;
};

export type Roles = Union<typeof roles>;

export type Action =
    | ReturnType<typeof initUser>
    | ReturnType<typeof setUser>;
