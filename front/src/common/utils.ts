import { Theme } from '@mui/material/styles';

import Response from '../types/common/response';
import { status, Success } from '../types/common/response';

export const isThemeLight = (theme: Theme) => {
    return theme.palette.mode === 'light';
}

export const getCssClassByTheme = (theme: Theme) => {
    return isThemeLight(theme) ? 'mode-light' : 'mode-dark';
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

export const getOnChange = (state: any, setState: React.Dispatch<React.SetStateAction<any>>) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== '') {
            setState({ ...state, [e.target.name]: e.target.value });
        } else {
            delete state[e.target.name];

            setState({ ...state });
        }
    };
};

export const getResponseError = (error: any) => {
    const data = error.response.data;

    if (typeof data === 'object') {
        return data;
    } else {

        const response: Response = {
            path: process.env.REACT_APP_BASE_URL + error.config.url,
            method: error.config.method.toUpperCase(),
            status: status.ERROR,
            data: {
                content: [],
                elements: 0,
                total_elements: 0,
                size: 0,
                page: 1,
                total_pages: 1
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
