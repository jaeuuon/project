import axios from 'axios';

import type { Response } from 'types/apis/response';

import { getResponseError } from 'common/util';

const instance = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export default instance;

export const get = async <T>(url: string, params: unknown): Promise<Response<T>> => {
    try {
        const { data } = await instance.get(url, { params });

        return data;
    } catch(error) {
        return getResponseError(error);
    }
};
