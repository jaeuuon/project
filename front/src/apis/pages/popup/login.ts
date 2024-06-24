import axios from 'apis';

import type { Params } from 'types/apis/pages/popup/login';
import type Response from 'types/apis/response';

import { camelToSnake, snakeToCamel, getResponseError } from 'common/utils';

export const postLogin = async (params: Params): Promise<Response> => {
    try {
        const response = await axios.post('/security/authentication', camelToSnake(params));

        axios.defaults.headers.common.Authorization = response.headers.authorization;

        return snakeToCamel(response.data);
    } catch(error: any) {
        return getResponseError(error);
    }
};
