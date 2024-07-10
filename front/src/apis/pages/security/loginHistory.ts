import { get } from 'apis';

import type { Params, Content } from 'types/apis/pages/security/loginHistory';
import type Response from 'types/apis/response';

const url = '/security/history' as const;

export const list = async (params: Params): Promise<Response<Content>> => {
    return await get(`${url}/list`, params);
}
