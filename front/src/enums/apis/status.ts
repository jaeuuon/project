import type { Union } from '../union';

export const statusCode = {
    SUCCESS: '성공',
    ERROR: '실패'
} as const;

export type StatusCode = Union<typeof statusCode>;
