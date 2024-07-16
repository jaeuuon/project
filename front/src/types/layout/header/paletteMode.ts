import { setDark, setLight } from 'modules/layout/header/paletteMode';

export type Action =
    | ReturnType<typeof setDark>
    | ReturnType<typeof setLight>
;
