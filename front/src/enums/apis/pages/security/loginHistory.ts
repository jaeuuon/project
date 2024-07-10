import type { Union } from 'enums/union';

export const column = {
    REQUEST_IP: { key: 'requestIp', value: 'Request IP' },
    RESULT: { key: 'result', value: 'Result' },
    CREATED_TIME: { key: 'createdTime', value: 'Created time' }
} as const;

export const loginResult = {
    SUCCESS: '성공',
    ERROR_PASSWORD: '비밀번호 불일치',
    ERROR_DEACTIVATE: '비활성화된 계정',
    ERROR_AUTHORITIES: '역할 또는 권한 정보 없음'
} as const;

export type LoginResult = Union<typeof loginResult>;
