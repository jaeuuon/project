import axios from 'axios';

import type Response from 'types/apis/response';

import { snakeToCamel, getResponseError } from 'common/utils';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});

export default instance;

export const get = async (url: string): Promise<Response> => {
    try {
        const { data } = await instance.get(url);

        return snakeToCamel(data);
    } catch(error: any) {
        return getResponseError(error);
    }
};
