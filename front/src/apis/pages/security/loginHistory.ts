import { get } from 'apis';

import type Response from 'types/apis/response';

const url = '/security/history' as const;

export const list = async (): Promise<Response> => {
    return await get(`${url}/list`);
}
