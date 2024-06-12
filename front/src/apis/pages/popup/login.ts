import axios from '../../';

import LoginParams from '../../../types/data/request/pages/popup/login';

export const postLogin = async (params: LoginParams) => {
    try {
        const response = await axios({
            url: '/security/authentication',
            method: 'post',
            data: params
        });

        return response.data;
    } catch(error: any) {
        return error.response.data;
    }
};


