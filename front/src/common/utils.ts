import type { Palette, PaletteMode } from '@mui/material';

import type { Severity, CodeMessage } from 'types/common/utils';
import type { StringIndex } from 'types/signature';
import type { Response } from 'types/apis/response';

import { GROUP } from 'enums/layout/header/menu';
import { GROUPS } from 'enums/layout/main/sidebar';
import { STATUS } from 'enums/apis/response';

export const findGroupByPath = (path: string) => Object.values(GROUP).find((GROUP) => GROUP.PATH === path);
export const findGroupsByPath = (path: string) => GROUPS.find(({ PATH, ITEMS }) => PATH === path || ITEMS.some((ITEM) => ITEM.PATH === path));

export const getGreyColor = (palette: Palette, mode: PaletteMode) => palette.grey[mode === 'light' ? 600 : 500];
export const getBorderColor = (palette: Palette, severity: Severity = 'primary') => `${palette[severity].main}80`;
export const getBackgroundColor = (palette: Palette, mode: PaletteMode) => `${palette.grey[mode === 'light' ? 50 : 900]}cc`;

export const getOnChange = (state: StringIndex, setState: React.Dispatch<React.SetStateAction<StringIndex>>) => {
    return ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name: key, value } = target;

        if (target.value !== '') {
            setState({ ...state, [key]: value });
        } else {
            delete state[key];

            setState({ ...state });
        }
    };
};

export const includesCode = (codeMessage: CodeMessage, searchCode?: string) => Object.values(codeMessage).some(({ code }) => code === searchCode);

const padStart = (number: number, maxLength: number) => number.toString().padStart(maxLength, '0');

export const getTimestamp = () => {
    const {
        getFullYear, getMonth, getDate,
        getHours, getMinutes, getSeconds, getMilliseconds,
        toTimeString
    } = new Date();

    const year = getFullYear();
    const month = padStart(getMonth() + 1, 2);
    const date = padStart(getDate(), 2);

    const hours = padStart(getHours(), 2);
    const minutes = padStart(getMinutes(), 2);
    const seconds = padStart(getSeconds(), 2);
    const milliseconds = padStart(getMilliseconds(), 3);

    let timestamp = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`;

    const timezone = toTimeString().match(/[+-]\d{4}/);

    if (timezone) {
        timestamp += timezone[0];
    }

    return timestamp;
};

export const getResponseError = <T>({ response, config }: any): Response<T> => {
    const { data } = response;
    const { url, method } = config;

    return typeof data === 'object'
        ? data
        : {
            path: `${import.meta.env.VITE_API_URL}${url}`,
            method: method.toUpperCase(),
            status: STATUS.ERROR,
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
