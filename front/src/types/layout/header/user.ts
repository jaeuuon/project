import { role } from 'enums/layout/header/user';

import type { CodeValue } from 'types/value';
import type { Union } from 'types/union';

import { initUser, setUser } from 'modules/layout/header/user';

export interface User {
    isInit: boolean;
    id?: number;
    email?: string;
    name?: string;
    roles: CodeValue<Role>[];
    exp?: number;
};

export type Role = Union<typeof role>;

export type Action =
    | ReturnType<typeof initUser>
    | ReturnType<typeof setUser>;
