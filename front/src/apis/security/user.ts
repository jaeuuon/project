import type { Params, Content } from 'types/apis/security/user';

import { USER } from 'constants/apis/security/url';

import { get } from 'apis';

export const detail = async (id: number) => await get<Content>(`${USER}/${id}`, {});
export const list = async (params: Params) => await get<Content>(`${USER}/list`, params);
