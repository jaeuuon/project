export const IGNORED_REISSUANCE_ERROR = {
    UNAUTHORIZED: { code: 'ERROR_BSC_UNAUTHORIZED', message: '유효한 인증 자격 증명이 없습니다.' },
    EXPIRED: { code: 'ERROR_JWT_EXPIRED', message: '토큰이 만료되었습니다.' }
} as const;
