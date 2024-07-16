import type { Params, Content } from 'types/apis/pages/security/loginHistory';
import type Response from 'types/apis/response';

import { URL } from 'enums/apis/pages/security/loginHistory';

import { get } from 'apis';

export const list = async (params: Params): Promise<Response<Content>> => {
    return await get(`${URL}/list`, params);
}
