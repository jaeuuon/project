import type { PaletteMode } from '@mui/material/index';

export default interface Mode {
    setMode: (mode: PaletteMode) => void;
};
