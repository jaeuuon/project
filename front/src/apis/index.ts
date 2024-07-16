import axios from 'axios';

import type { Pageable } from 'types/apis/request';
import type Response from 'types/apis/response';

import { snakeToCamel, getResponseError } from 'common/utils';

const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL });

export default instance;

export const get = async <T>(url: string, pageable: Pageable): Promise<Response<T>> => {
    try {
        const { data } = await instance.get(url, { params: pageable });

        return snakeToCamel(data);
    } catch(error: any) {
        return getResponseError(error);
    }
};
