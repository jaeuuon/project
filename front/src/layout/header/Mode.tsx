import { useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import { setMode } from 'modules/layout/header/mode';

import { isThemeLight } from 'common/utils';

const Mode = () => {
    const theme = useTheme();
    const isLight = isThemeLight(theme);

    const dispatch = useDispatch();

    const onClick = () => dispatch(setMode(!isLight ? 'light' : 'dark'));

    return (
        <Tooltip title="Light / Dark" placement="bottom-end" arrow>
            <Button id="button-mode" variant="outlined" onClick={onClick}>
                {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
            </Button>
        </Tooltip>
    );
};

export default Mode;
