import { PaletteMode } from '@mui/material/index';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initState: PaletteMode = getMql().matches ? 'light' : 'dark';

const action = {
    SET_LIGHT: 'mode/setLight',
    SET_DARK: 'mode/setDark'
} as const;

export const setModeLight = () => ({ type: action.SET_LIGHT });
export const setModeDark = () => ({ type: action.SET_DARK });

type Action =
    | ReturnType<typeof setModeLight>
    | ReturnType<typeof setModeDark>;

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
