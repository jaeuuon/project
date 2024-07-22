import type { Union } from 'types/union';
import type { CodeValue } from 'types/value';

import { role } from 'enums/layout/header/user';

export type Role = Union<typeof role>;

export interface UserState {
    isInit: boolean;
    id?: number;
    email?: string;
    name?: string;
    roles: CodeValue<Role>[];
    exp?: number;
};
