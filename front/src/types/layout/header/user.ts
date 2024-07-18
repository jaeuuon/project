import type { Union } from 'types/union';
import type { CodeValue } from 'types/value';

import { role } from 'enums/layout/header/user';

import { set, init } from 'modules/layout/header/user';

export type Role = Union<typeof role>;

export interface User {
    isInit: boolean;
    id?: number;
    email?: string;
    name?: string;
    roles: CodeValue<Role>[];
    exp?: number;
};

export type Action =
    | ReturnType<typeof set>
    | ReturnType<typeof init>
;
