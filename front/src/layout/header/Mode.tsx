import { useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import { setModeLight, setModeDark } from 'modules/layout/header/mode';

import { isThemeLight } from 'common/utils';

const Mode = () => {
    const theme = useTheme();
    const isLight = isThemeLight(theme);

    const dispatch = useDispatch();

    const onClick = () => dispatch(!isLight ? setModeLight() : setModeDark());

    return (
        <Grid id="layout-header-grid-mode" item xs="auto">
            <Tooltip title="Light / Dark" placement="bottom-end" arrow>
                <Button className="button-header" variant="outlined" onClick={onClick}>
                    {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                </Button>
            </Tooltip>
        </Grid>
    );
};

export default Mode;
