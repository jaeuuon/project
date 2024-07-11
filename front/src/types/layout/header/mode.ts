import { setModeLight, setModeDark } from 'modules/layout/header/mode';

export type Action =
    | ReturnType<typeof setModeLight>
    | ReturnType<typeof setModeDark>;
