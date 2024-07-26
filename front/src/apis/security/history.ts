import type { Params, Content } from 'types/apis/security/history';

import { URL } from 'constants/apis/security/history';

import { get } from 'apis';

export const list = async (params: Params) => await get<Content>(`${URL}/list`, params);
