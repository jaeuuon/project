import { PaletteMode } from '@mui/material/index';

import { action } from 'enums/layout/header/mode'; 

import type { Action } from 'types/layout/header/mode';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initState: PaletteMode = getMql().matches ? 'light' : 'dark';

export const setModeLight = () => ({ type: action.SET_LIGHT });
export const setModeDark = () => ({ type: action.SET_DARK });

const mode = (state: PaletteMode = initState, { type }: Action) => {
    switch (type) {
        case action.SET_LIGHT:
            return 'light';
        case action.SET_DARK:
            return 'dark';
        default:
            return state;
    }
};

export default mode;
