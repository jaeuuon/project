import type { LoginParams, LoginContent } from 'types/apis/security/history';

import { HISTORY } from 'constants/apis/security/url';

import { get } from 'apis';

export const loginList = async (params: LoginParams) => await get<LoginContent>(`${HISTORY.LOGIN}/list`, params);
