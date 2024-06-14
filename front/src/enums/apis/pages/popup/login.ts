export const emailErrorCode = {
    BLANK: { CODE: 'ERROR_SCR_EMAIL_BLANK', MESSAGE: '이메일을 입력하십시오.' },
    SIZE: { CODE: 'ERROR_SCR_EMAIL_SIZE', MESSAGE: '이메일은 4자에서 100자 사이여야 합니다.' },
    FORMAT: { CODE: 'ERROR_SCR_EMAIL_FORMAT', MESSAGE: '이메일 형식이 잘못되었습니다.' },
    WRONG: { CODE: 'ERROR_SCR_EMAIL_WRONG', MESSAGE: '이메일이 잘못되었습니다.' }
} as const;

export const passwordErrorCode = {
    BLANK: { CODE: 'ERROR_SCR_PASSWORD_BLANK', MESSAGE: '비밀번호를 입력하십시오.' },
    SIZE: { CODE: 'ERROR_SCR_PASSWORD_SIZE', MESSAGE: '비밀번호는 4자에서 50자 사이여야 합니다.' },
    WRONG: { CODE: 'ERROR_SCR_PASSWORD_WRONG', MESSAGE: '비밀번호가 잘못되었습니다.' }
} as const;
