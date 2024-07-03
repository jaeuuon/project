import type { Union } from 'enums/union';

export const roles = [
    'ROLE_ADMIN',
    'ROLE_USER'
] as const;

export type Roles = Union<typeof roles>;
