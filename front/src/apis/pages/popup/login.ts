import axios from '../../';

import type { Params } from '../../../types/apis/pages/popup/login';

import { camelToSnake, snakeToCamel, getResponseError } from '../../../common/utils';

export const postLogin = async (params: Params) => {
    try {
        const response = await axios.post('/security/authentication', camelToSnake(params));

        return snakeToCamel(response.data);
    } catch(error: any) {
        return getResponseError(error);
    }
};
