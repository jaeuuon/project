import type { PaletteMode } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import type { Severity } from 'types/severity';
import type { StringIndex } from 'types/signature';
import type { CodeMessage } from 'types/common/utils';
import type Response from 'types/apis/response';

import { groups } from 'enums/layout/main/sidebar';
import { group } from 'enums/layout/header/menu';
import { status } from 'enums/apis/response';

export const findGroupsByPath = (path: string) => groups.find(({ PATH, ITEMS }) => PATH === path || ITEMS.some(({ PATH }) => PATH === path));
export const findGroupByPath = (path?: string) => Object.values(group).find(({ PATH }) => PATH === path);

export const getBorderColor = (theme: Theme, severity: Severity = 'primary') => `${theme.palette[severity].main}80`;
export const getBackgroundColor = (mode: PaletteMode, theme: Theme) => `${theme.palette.grey[mode === 'light' ? 50 : 900]}cc`;

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

export const includesCode = (codeMessage: CodeMessage, searchCode?: string) => Object.values(codeMessage).some(({ code }) => code === searchCode);

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

    return typeof data === 'object'
        ? data
        : {
            path: `${import.meta.env.VITE_API_URL}${error.config.url}`,
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
        }
    ;
};
