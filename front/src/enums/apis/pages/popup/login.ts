export const URL = '/security/authentication' as const;

export const emailError = {
    BLANK: { code: 'ERROR_SCR_EMAIL_BLANK', message: '이메일을 입력하십시오.' },
    SIZE: { code: 'ERROR_SCR_EMAIL_SIZE', message: '이메일은 4자에서 100자 사이여야 합니다.' },
    FORMAT: { code: 'ERROR_SCR_EMAIL_FORMAT', message: '이메일 형식이 잘못되었습니다.' },
    WRONG: { code: 'ERROR_SCR_EMAIL_WRONG', message: '이메일이 잘못되었습니다.' }
} as const;

export const passwordError = {
    BLANK: { code: 'ERROR_SCR_PASSWORD_BLANK', message: '비밀번호를 입력하십시오.' },
    SIZE: { code: 'ERROR_SCR_PASSWORD_SIZE', message: '비밀번호는 4자에서 50자 사이여야 합니다.' },
    WRONG: { code: 'ERROR_SCR_PASSWORD_WRONG', message: '비밀번호가 잘못되었습니다.' }
} as const;
