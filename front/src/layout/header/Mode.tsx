import { useTheme } from '@mui/material/styles';
import { Button, Tooltip } from '@mui/material';
import { LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import type ModeType from 'types/layout/header/mode';

import { isThemeLight } from 'common/utils';

const Mode = ({ setMode }: ModeType) => {
    const theme = useTheme();
    const isLight = isThemeLight(theme);

    const onClick = () => setMode(!isLight ? 'light' : 'dark');

    return (
        <Tooltip title="Light / Dark" placement="bottom-end" arrow>
            <Button id="button-set-mode" variant="outlined" onClick={onClick}>
                {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
            </Button>
        </Tooltip>
    );
};

export default Mode;
