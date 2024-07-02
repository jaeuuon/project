import { PaletteMode } from '@mui/material/index';

export const getMql = () => window.matchMedia("(prefers-color-scheme: light)");

const initState: PaletteMode = getMql().matches ? 'light' : 'dark';

const action = {
    SET: 'mode/set'
} as const;

export const setMode = (paletteMode: PaletteMode) => ({ type: action.SET, payload: paletteMode });

type Action =
    | ReturnType<typeof setMode>;

const mode = (state: PaletteMode = initState, { type, payload }: Action) => {
    switch (type) {
        case action.SET:
            return payload;
        default:
            return state;
    }
};

export default mode;
