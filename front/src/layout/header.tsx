import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PaletteMode } from '@mui/material/index';
import { useTheme } from '@mui/material/styles';
import { Grid, Button, Tooltip } from '@mui/material';
import { Login, LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import Popup from './popup';

import { Detail } from '../types/menu';

import constant from '../common/constant';
import { isThemeLight, getCssClassByTheme } from '../common/utils';

const Header = ({
    setMode
}: {
    setMode: (mode: PaletteMode) => void;
}) => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isLight = isThemeLight(theme);

    const [isTop, setTop] = useState(true);
    const [isOpenLogin, setOpenLogin] = useState(false);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0 ? true : false);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div id="div-header" className={[getCssClassByTheme(theme), (isTop ? 'box-shadow-none' : '')].join(' ')}>
                <Grid id="grid-header" container>
                    <Grid id="grid-header-icon" item xs="auto">
                        <img src="/logo192.png" alt="logo" />
                    </Grid>
                    <Grid id="grid-header-content" item xs>
                        {Object.values(constant.MENU).map((detail: Detail, index) => {
                            return (
                                <Button key={`button-header-menu-${index}`} startIcon={detail.icon} onClick={() => navigate(detail.path)}>
                                    <span className="span-button-label">{detail.label}</span>
                                </Button>
                            );
                        })}
                    </Grid>
                    <Grid id="grid-header-user-and-mode" item xs="auto">
                        <Button variant="outlined" startIcon={<Login />} onClick={() => setOpenLogin(true)}>
                            <span className="span-button-label">Login</span>
                        </Button>
                        <Tooltip title="Light / Dark" placement="bottom-end" arrow>
                            <Button variant="outlined" onClick={() => setMode(!isLight ? 'light' : 'dark')}>
                                {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <Popup isOpen={isOpenLogin} setOpen={setOpenLogin} width={400} icon={<Login />} label="Login" />
        </>
    );
};

export default Header;
