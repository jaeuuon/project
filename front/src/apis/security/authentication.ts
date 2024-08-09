import type { Params, Content } from 'types/apis/security/authentication';
import type { Response } from 'types/apis/response';

import { URL } from 'constants/apis/security';

import apis from 'apis';

import { getResponseError } from 'common/util';

export const login = async (params: Params): Promise<Response<Content>> => {
    try {
        const { data, headers: { authorization } } = await apis.post(URL.AUTHENTICATION, params);
        apis.defaults.headers.common.Authorization = authorization;

        return data;
    } catch(error) {
        return getResponseError(error);
    }
};

export const reissuance = async (): Promise<Response<Content>> => {
    try {
        const { data, headers: { authorization } } = await apis.put(URL.AUTHENTICATION);
        apis.defaults.headers.common.Authorization = authorization;

        return data;
    } catch(error) {
        return getResponseError(error);
    }
};

export const logout = async (): Promise<Response<Content>> => {
    try {
        const { data } = await apis.delete(URL.AUTHENTICATION);
        apis.defaults.headers.common.Authorization = null;

        return data;
    } catch(error) {
        return getResponseError(error);
    }
};
