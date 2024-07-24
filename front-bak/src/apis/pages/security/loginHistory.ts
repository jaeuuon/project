import type { Params, Content } from 'types/apis/pages/security/loginHistory';

import { URL } from 'enums/apis/pages/security/loginHistory';

import { get } from 'apis';

export const list = async (params: Params) => {
    return await get<Content>(`${URL}/list`, params);
};
