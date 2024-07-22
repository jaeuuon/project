import type { Union } from 'types/union';
import type { CodeValue } from 'types/value';

import { role } from 'enums/layout/header/user';

export interface IsInit {
    isInit: boolean;
};

export type Role = Union<typeof role>;

export interface Roles {
    roles: CodeValue<Role>[];
};

export interface UserState extends IsInit, Roles {
    id?: number;
    email?: string;
    name?: string;
    exp?: number;
};
