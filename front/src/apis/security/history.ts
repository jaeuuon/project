import type { Params, Content } from 'types/apis/security/history';

import { HISTORY } from 'constants/apis/security/url';

import { get } from 'apis';

export const list = async (params: Params) => await get<Content>(`${HISTORY}/list`, params);
