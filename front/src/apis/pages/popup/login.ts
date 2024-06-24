import axios from 'apis';

import type { Params } from 'types/apis/pages/popup/login';
import type Response from 'types/apis/response';

import { camelToSnake, snakeToCamel, getResponseError } from 'common/utils';

export const postLogin = async (params: Params): Promise<Response> => {
    try {
        const { data, headers } = await axios.post('/security/authentication', camelToSnake(params));

        axios.defaults.headers.common.Authorization = headers.authorization;

        return snakeToCamel(data);
    } catch(error: any) {
        return getResponseError(error);
    }
};

export const putReissuance = async (): Promise<Response> => {
    try {
        const { data, headers } = await axios.put('/security/authentication');

        axios.defaults.headers.common.Authorization = headers.authorization;

        return snakeToCamel(data);
    } catch(error: any) {
        return getResponseError(error);
    }
};
