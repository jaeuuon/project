import type { LoginResult } from 'enums/apis/pages/security/loginHistory';

export interface Content {
    requestIp: string;
    result: LoginResult;
    createdTime: string;
};
