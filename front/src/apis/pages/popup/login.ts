import axios from '../../';

import LoginParams from '../../../types/data/request/pages/popup/login';

import { getResponseError } from '../../../common/utils';

export const postLogin = async (params: LoginParams) => {
    try {
        const response = await axios.post('/security/authentication', params);

        return response.data;
    } catch(error: any) {
        return getResponseError(error);
    }
};
