import axios from 'axios';

import type { Response } from 'types/apis/response';

import { getResponseError } from 'common/utils';

export const apis = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const get = async <T>(url: string, params: unknown): Promise<Response<T>> => {
    try {
        const { data } = await apis.get(url, { params });

        return data;
    } catch(error: any) {
        return getResponseError(error);
    }
};
