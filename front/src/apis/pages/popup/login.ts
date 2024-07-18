import type { Params, Content } from 'types/apis/pages/popup/login';
import type Response from 'types/apis/response';

import { URL } from 'enums/apis/pages/popup/login';

import axios from 'apis';

import { getResponseError } from 'common/utils';

export const login = async (params: Params): Promise<Response<Content>> => {
    try {
        const { data, headers } = await axios.post(URL, params);

        axios.defaults.headers.common.Authorization = headers.authorization;

        return data;
    } catch(error: any) {
        return getResponseError(error);
    }
};

export const reissuance = async (): Promise<Response<Content>> => {
    try {
        const { data, headers } = await axios.put(URL);

        axios.defaults.headers.common.Authorization = headers.authorization;

        return data;
    } catch(error: any) {
        return getResponseError(error);
    }
};

export const logout = async (): Promise<Response<Content>> => {
    try {
        const { data } = await axios.delete(URL);

        axios.defaults.headers.common.Authorization = undefined;

        return data;
    } catch(error: any) {
        return getResponseError(error);
    }
};
