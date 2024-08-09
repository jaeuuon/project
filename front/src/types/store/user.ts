import type { ValueOf } from 'types/union';

import { ROLE } from 'constants/apis/security';

export interface Role {
    code: ValueOf<typeof ROLE>;
    value: string;
};

export interface UserState {
    id: number;
    email: string;
    name: string;
    roles: Role[];
    exp?: number;
    isInit: boolean;
};
