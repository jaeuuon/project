import type { PaletteMode } from '@mui/material/index';

export default interface Header {
    setMode: (mode: PaletteMode) => void;
};
