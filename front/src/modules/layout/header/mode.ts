import type { PaletteMode } from '@mui/material';

import type { Action } from 'types/layout/header/mode';

import { action } from 'enums/layout/header/mode'; 

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initState: PaletteMode = getMql().matches ? 'light' : 'dark';

export const setDark = () => ({ type: action.SET_DARK });
export const setLight = () => ({ type: action.SET_LIGHT });

const mode = (state: PaletteMode = initState, { type }: Action) => {
    switch (type) {
        case action.SET_DARK:
            return 'dark';
        case action.SET_LIGHT:
            return 'light';
        default:
            return state;
    }
};

export default mode;
