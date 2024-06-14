import axios from '../../';

import { Params } from '../../../types/apis/pages/popup/login';

import { getResponseError } from '../../../common/utils';

export const postLogin = async (params: Params) => {
    try {
        const response = await axios.post('/security/authentication', params);

        return response.data;
    } catch(error: any) {
        return getResponseError(error);
    }
};
