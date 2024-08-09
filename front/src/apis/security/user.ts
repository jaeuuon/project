import type { Params, Content } from 'types/apis/security/user';

import { URL } from 'constants/apis/security';

import { get } from 'apis';

export const detail = async (id: number) => await get<Content>(`${URL.USER}/${id}`, {});
export const list = async (params: Params) => await get<Content>(`${URL.USER}/list`, params);
