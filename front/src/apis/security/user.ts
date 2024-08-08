import type { Params, Content } from 'types/apis/security/user';

import { URL } from 'constants/apis/security/user';

import { get } from 'apis';

export const list = async (params: Params) => await get<Content>(`${URL}/list`, params);
