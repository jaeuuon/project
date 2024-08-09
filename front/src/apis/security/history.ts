import type { Params, Content } from 'types/apis/security/history';

import { URL } from 'constants/apis/security';

import { get } from 'apis';

export const list = async (params: Params) => await get<Content>(`${URL.HISTORY}/list`, params);
