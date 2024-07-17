import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import type { RootState } from 'types/modules';

import { setDark, setLight } from 'modules/layout/header/paletteMode';

const PaletteMode = () => {
    const dispatch = useDispatch();
    const isPaletteModeLight = useSelector((state: RootState) => state.paletteMode) === 'light';

    const onClick = () => dispatch(isPaletteModeLight ? setDark() : setLight());

    return (
        <Grid id="layout-header-grid-palette-mode" item xs="auto">
            <Tooltip placement="bottom-end" arrow title="Light / Dark">
                <Button className="button-header" variant="outlined" onClick={onClick}>
                    {isPaletteModeLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default PaletteMode;
