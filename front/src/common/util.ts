import { isAxiosError } from 'axios';

import { type Palette, type PaletteMode, type AlertColor, colors } from '@mui/material';

import type { CodeMessage } from 'types/apis/response';
import type { StringIndex } from 'types/signature';
import type { ConstCodeMessage } from 'types/common/util';
import type { Response } from 'types/apis/response';

import { STATUS } from 'constants/apis/response';

export const getBorderColor = (palette: Palette, severity?: AlertColor) => `${palette[severity ?? 'primary'].main}80`;

const isLightMode = (mode: PaletteMode) => mode === 'light';
export const getGreyColor = (mode: PaletteMode) => colors.grey[isLightMode(mode) ? 500 : 400];
export const getGreyBorderColor = (mode: PaletteMode) => colors.grey[isLightMode(mode) ? 300 : 600];
export const getGreyBackgroundColor = (mode: PaletteMode, isAlpha: boolean = true) => `${colors.grey[isLightMode(mode) ? 50 : 900]}${isAlpha ? 'bf' : ''}`;

export const getFocusAndSetError = (setError: React.Dispatch<React.SetStateAction<CodeMessage>>) =>
    ({ current }: React.RefObject<HTMLInputElement>, error: CodeMessage) => {
        current?.focus();

        setError(error);

        return false;
    };
;

export const getOnChange = <T extends StringIndex>(state: T, setState: React.Dispatch<React.SetStateAction<T>>) =>
    ({ target: { name: key, value } }: React.ChangeEvent<HTMLInputElement>) => {
        if (value !== '') {
            setState({ ...state, [key]: value });
        } else {
            delete state[key];

            setState({ ...state });
        }
    };
;

export const includesCode = (constCodeMessage: ConstCodeMessage, code: string) => Object.values(constCodeMessage).some(({ code: constCode }) => constCode === code);

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

    const timezone = today.toTimeString().match(/[+-]\d{4}/);

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}${timezone?.[0] ?? ''}`;
};

const isResponse = <T>(data: unknown): data is Response<T> => {
    const response = data as Response<T>;

    return typeof response === 'object' && typeof response.data === 'object';
};

export const getResponseError = <T>(error: unknown): Response<T> => {
    if (isAxiosError(error)) {
        const { response, config } = error;
        const data = response?.data;

        if (isResponse<T>(data)) {
            return data;
        } else if (config) {
            const { baseURL, url, method } = config;

            return {
                path: `${baseURL}${url}`,
                method: `${method}`.toUpperCase(),
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
            };
        }
    }

    return {
        path: '',
        method: '',
        status: STATUS.ERROR,
        data: {
            code: 'ERROR_FRT_SCRIPT',
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
};
