import type { PaletteMode } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import type { StringIndex } from 'types/signature';
import type Response from 'types/apis/response';
import type { CodeMessage, SearchCode } from 'types/common/utils';

import { status } from 'enums/apis/response';

export const getBackgroundColorClass = (mode: PaletteMode) => `background-color-${mode}`;
export const getBorderColor = (theme: Theme) => `${theme.palette.primary.main}80`;

export const getOnChange = (state: StringIndex, setState: React.Dispatch<React.SetStateAction<StringIndex>>) => {
    return ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        if (target.value !== '') {
            setState({ ...state, [target.name]: target.value });
        } else {
            delete state[target.name];

            setState({ ...state });
        }
    };
};

export const includesCode = (codeMessage: CodeMessage, searchCode: SearchCode) => Object.values(codeMessage).some(({ code }) => code === searchCode);

export const camelToSnake = (any: any): any => {
    if (Array.isArray(any)) {
        return any.map((value) => camelToSnake(value));
    } else if (any !== null && typeof any === 'object') {
        return Object.entries(any).reduce((accumulator, [key, value]) => (
            { ...accumulator, [key.replace(/([A-Z])/g, (_match, string) => `_${string.toLowerCase()}`)]: camelToSnake(value) }
        ), {});
    }

    return any;
};

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

const padStart = (number: number, maxLength: number) => number.toString().padStart(maxLength, '0');

export const getTimestamp = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = padStart(today.getMonth() + 1, 2);
    const date = padStart(today.getDate(), 2);

    const hours = padStart(today.getHours(), 2);
    const minutes = padStart(today.getMinutes(), 2);
    const seconds = padStart(today.getSeconds(), 2);
    const milliseconds = padStart(today.getMilliseconds(), 3);

    let result = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    const timezone = today.toTimeString().match(/[+-]\d{4}/);

    if (timezone) {
        result += timezone[0];
    }

    return result;
};

export const getResponseError = <T>(error: any): Response<T> => {
    const data = error.response.data;

    if (typeof data === 'object') {
        return snakeToCamel(data);
    } else {
        const response: Response<T> = {
            path: `${process.env.REACT_APP_BASE_URL}${error.config.url}`,
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
