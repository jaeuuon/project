import type { Theme } from '@mui/material/styles';

import { statusCode } from '../enums/apis/status';

import type Input from '../types/components/input';
import type Content from '../types/apis/pages/popup/login';
import type Code from '../types/apis/code';
import type { SearchCode } from '../types/common/utils';
import type Response from '../types/apis/response';

export const isThemeLight = (theme: Theme) => {
    return theme.palette.mode === 'light';
}

export const getCssClassByTheme = (theme: Theme) => {
    return isThemeLight(theme) ? 'mode-light' : 'mode-dark';
};

export const getOnChange = (state: Input, setState: React.Dispatch<React.SetStateAction<Input>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            setState({ ...state, [e.target.name]: e.target.value });
        } else {
            delete state[e.target.name];

            setState({ ...state });
        }
    };
};

export const getPayload = (content: Content) => {
    const base64Url = content.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    return snakeToCamel(JSON.parse(jsonPayload));
};

export const includesCode = (code: Code, searchCode: SearchCode) => {
    return Object.values(code).some((code) => code.CODE === searchCode);
};

export const snakeToCamel = (object: object): any => {
    if (Array.isArray(object)) {
        return object.map((value) => snakeToCamel(value));
    } else if (object !== null && typeof object === 'object') {
        return Object.entries(object).reduce((accumulator, [key, value]) => (
            { ...accumulator, [key.replace(/_(.)/g, (_match, string) => string.toUpperCase())]: snakeToCamel(value) }
        ), {});
    }

    return object;
};

export const getResponseError = (error: any) => {
    const data = error.response.data;

    if (typeof data === 'object') {
        return snakeToCamel(data);
    } else {
        const response: Response = {
            path: process.env.REACT_APP_BASE_URL + error.config.url,
            method: error.config.method.toUpperCase(),
            status: statusCode.ERROR,
            data: {
                content: [],
                elements: 0,
                totalElements: 0,
                size: 0,
                page: 1,
                totalPages: 1
            },
            errors: [{
                code: 'ERROR_FRT_INTERNAL_SERVER_ERROR',
                message: '문제가 발생했습니다. 관리자에게 문의하십시오.'
            }],
            timestamp: getTimestamp()
        };

        return response;
    }
};

export const getTimestamp = () => {
    const today = new Date();

    const padStart = (number: number) => number.toString().padStart(2, '0');

    const year = today.getFullYear();
    const month = padStart(today.getMonth() + 1);
    const date = padStart(today.getDate());

    const hours = padStart(today.getHours());
    const minutes = padStart(today.getMinutes());
    const seconds = padStart(today.getSeconds());
    const milliseconds = today.getMilliseconds().toString().padStart(3, '0');

    let result = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds;

    const timezone = today.toTimeString().match(/[+-]\d{4}/);

    if (timezone) {
        result += timezone[0];
    }

    return result;
};
