import { Union } from '../../../common/union';

export const emailCode = {
    ERROR_SCR_EMAIL_BLANK: '이메일을 입력하십시오.',
    ERROR_SCR_EMAIL_SIZE: '이메일은 4자에서 100자 사이여야 합니다.',
    ERROR_SCR_EMAIL_FORMAT: '이메일 형식이 잘못되었습니다.',
    ERROR_SCR_EMAIL: '이메일이 잘못되었습니다.'
} as const;

export type EmailCode = Union<typeof emailCode>;

export const passwordCode = {
    ERROR_SCR_PASSWORD_BLANK: '비밀번호를 입력하십시오.',
    ERROR_SCR_PASSWORD_SIZE: '비밀번호는 4자에서 50자 사이여야 합니다.',
    ERROR_SCR_PASSWORD: '비밀번호가 잘못되었습니다.'
} as const;

export type PasswordCode = Union<typeof passwordCode>;
