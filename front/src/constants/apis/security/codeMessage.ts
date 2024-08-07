export const REISSUANCE_IGNORED_ERROR = {
    UNAUTHORIZED: { code: 'ERROR_BSC_UNAUTHORIZED', message: '유효한 인증 자격 증명이 없습니다.' },
    EXPIRED: { code: 'ERROR_JWT_EXPIRED', message: '토큰이 만료되었습니다.' }
} as const;

export const ID_ERROR = {
    BLANK: { code: 'ERROR_SCR_ID_BLANK', message: '아이디가 비어있습니다.' }
} as const;

export const EMAIL_ERROR = {
    BLANK: { code: 'ERROR_SCR_EMAIL_BLANK', message: '이메일을 입력하십시오.' },
    SIZE: { code: 'ERROR_SCR_EMAIL_SIZE', message: '이메일은 4자에서 100자 사이여야 합니다.' },
    FORMAT: { code: 'ERROR_SCR_EMAIL_FORMAT', message: '이메일 형식이 잘못되었습니다.' },
    WRONG: { code: 'ERROR_SCR_EMAIL_WRONG', message: '이메일이 잘못되었습니다.' }
} as const;

export const PASSWORD_ERROR = {
    BLANK: { code: 'ERROR_SCR_PASSWORD_BLANK', message: '비밀번호를 입력하십시오.' },
    ENCRYPT_SIZE: { code: 'ERROR_SCR_PASSWORD_ENCRYPT_SIZE', message: '비밀번호의 길이가 잘못되었습니다.' },
    DECRYPT_SIZE: { code: 'ERROR_SCR_PASSWORD_DECRYPT_SIZE', message: '비밀번호는 4자에서 50자 사이여야 합니다.' },
    WRONG: { code: 'ERROR_SCR_PASSWORD_WRONG', message: '비밀번호가 잘못되었습니다.' }
} as const;

export const NAME_ERROR = {
    BLANK: { code: 'ERROR_SCR_NAME_BLANK', message: '이름을 입력하십시오.' },
    SIZE: { code: 'ERROR_SCR_NAME_SIZE', message: '이름은 2자에서 50자 사이여야 합니다.' }
} as const;

export const POSTAL_CODE_ERROR = {
    SIZE: { code: 'ERROR_SCR_POSTAL_CODE_SIZE', message: '우편번호는 최대 10자까지 가능합니다.' }
} as const;

export const ADDRESS_ERROR = {
    SIZE: { code: 'ERROR_SCR_ADDRESS_SIZE', message: '주소는 최대 100자까지 가능합니다.' }
} as const;

export const DETAIL_ADDRESS_ERROR = {
    SIZE: { code: 'ERROR_SCR_DETAIL_ADDRESS_SIZE', message: '상세주소는 최대 200자까지 가능합니다.' }
} as const;
