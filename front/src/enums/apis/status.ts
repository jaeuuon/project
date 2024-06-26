import type { Union } from 'enums/union';

export const status = {
    SUCCESS: '성공',
    ERROR: '실패'
} as const;

export type Status = Union<typeof status>;
