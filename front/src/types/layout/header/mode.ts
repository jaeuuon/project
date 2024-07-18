import { setDark, setLight } from 'modules/layout/header/mode';

export type Action =
    | ReturnType<typeof setDark>
    | ReturnType<typeof setLight>
;
