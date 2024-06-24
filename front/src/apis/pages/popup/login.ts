import axios from 'apis';

import type Response from 'types/apis/common';
import type { Params } from 'types/apis/pages/popup/login';

import { camelToSnake, snakeToCamel, getResponseError } from 'common/utils';

const url = '/security/authentication';

export const postLogin = async (params: Params): Promise<Response> => {
    try {
        const { data, headers } = await axios.post(url, camelToSnake(params));

        axios.defaults.headers.common.Authorization = headers.authorization;

        return snakeToCamel(data);
    } catch(error: any) {
        return getResponseError(error);
    }
};

export const putReissuance = async (): Promise<Response> => {
    try {
        const { data, headers } = await axios.put(url);

        axios.defaults.headers.common.Authorization = headers.authorization;

        return snakeToCamel(data);
    } catch(error: any) {
        return getResponseError(error);
    }
};
