import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import type { RootState } from 'types/modules';

import { setDark, setLight } from 'modules/layout/header/mode';

const Mode = () => {
    const dispatch = useDispatch();
    const isLight = useSelector((state: RootState) => state.mode) === 'light';

    const onClick = () => dispatch(isLight ? setDark() : setLight());

    return (
        <Grid id="layout-header-grid-mode" item xs="auto">
            <Tooltip placement="bottom-end" arrow title="Light / Dark">
                <Button className="button-header" variant="outlined" onClick={onClick}>
                    {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default Mode;
