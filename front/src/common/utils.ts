import type { Theme } from '@mui/material/styles';

import { status } from 'enums/apis/status';

import type { Input } from 'types/apis/common';
import type { default as Response } from 'types/apis/common';
import type { CodeMessageEnum, SearchCode } from 'types/common/utils';

export const camelToSnake = (any: any): any => {
    if (Array.isArray(any)) {
        return any.map((value) => camelToSnake(value));
    } else if (any !== null && typeof any === 'object') {
        return Object.entries(any).reduce((accumulator, [key, value]) => (
            { ...accumulator, [key.replace(/([A-Z])/g, (_match, string) => '_' + string.toLowerCase())]: camelToSnake(value) }
        ), {});
    }

    return any;
};

export const getBorderColor = (theme: Theme) => theme.palette.primary.main + '80';
export const getHoverBackgroundColor = (theme: Theme) => theme.palette.grey[400] + Math.round(255 - (255 * theme.palette.action.hoverOpacity)).toString(16).padStart(2, '0');

export const getCssClassByTheme = (theme: Theme) => 'background-mode-' + (isThemeLight(theme) ? 'light' : 'dark');
export const isThemeLight = (theme: Theme) => theme.palette.mode === 'light';

export const getOnChange = (state: Input, setState: React.Dispatch<React.SetStateAction<Input>>) => {
    return ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.value !== '') {
            setState({ ...state, [target.name]: target.value });
        } else {
            delete state[target.name];

            setState({ ...state });
        }
    };
};

export const getResponseError = (error: any): Response => {
    const data = error.response.data;

    if (typeof data === 'object') {
        return snakeToCamel(data);
    } else {
        const response: Response = {
            path: process.env.REACT_APP_BASE_URL + error.config.url,
            method: error.config.method.toUpperCase(),
            status: status.ERROR,
            data: {
                code: 'ERROR_FRT_INTERNAL_SERVER_ERROR',
                message: '문제가 발생했습니다. 관리자에게 문의하십시오.',
                content: [],
                elements: 0,
                totalElements: 0,
                size: 0,
                page: 1,
                totalPages: 1
            },
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

export const includesCode = (codeMessageEnum: CodeMessageEnum, searchCode: SearchCode) => Object.values(codeMessageEnum).some(({ code }) => code === searchCode);

export const snakeToCamel = (any: any): any => {
    if (Array.isArray(any)) {
        return any.map((value) => snakeToCamel(value));
    } else if (any !== null && typeof any === 'object') {
        return Object.entries(any).reduce((accumulator, [key, value]) => (
            { ...accumulator, [key.replace(/_(.)/g, (_match, string) => string.toUpperCase())]: snakeToCamel(value) }
        ), {});
    }

    return any;
};
