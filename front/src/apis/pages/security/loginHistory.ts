import { get } from 'apis';

import { URL } from 'enums/apis/pages/security/loginHistory';

import type { Params, Content } from 'types/apis/pages/security/loginHistory';
import type Response from 'types/apis/response';

export const list = async (params: Params): Promise<Response<Content>> => {
    return await get(`${URL}/list`, params);
}
