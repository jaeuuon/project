import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, Button, Avatar, Tooltip } from '@mui/material';
import {
    HomeOutlined, InfoOutlined,
    Person, Logout, Login,
    LightModeOutlined, DarkModeOutlined
} from '@mui/icons-material';

import { status } from 'enums/apis/status';

import type HeaderType from 'types/layout/header';
import type { default as LoginContent } from 'types/apis/pages/popup/login';

import { RootState } from 'modules';
import { initUser, setUser } from 'modules/user';

import { putReissuance } from 'apis/pages/popup/login';

import Popup from 'layout/Popup';
import LoginPopup from 'pages/popup/Login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { isThemeLight, getCssClassByTheme } from 'common/utils';

const menu = {
    home: {
        icon: <HomeOutlined />,
        label: 'Home',
        path: '/'
    },
    information: {
        icon: <InfoOutlined />,
        label: 'Information',
        path: '/information'
    }
};

const Header = ({ setMode }: HeaderType) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const theme = useTheme();
    const isLight = isThemeLight(theme);

    const [isTop, setTop] = useState(true);
    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const reissuance = useCallback(async () => {
        const { status: responseStatus, data } = await putReissuance();

        if (responseStatus === status.SUCCESS) {
            const { access }: LoginContent = data.content[0];

            const payload = getPayload(access);
            const user = getUser(payload);

            dispatch(setUser(user));

            setTimeout(reissuance, getDelay(payload));
        } else {
            dispatch(initUser());

            // 메시지에 따른 알림 표시.
        }
    }, [dispatch]);

    useEffect(() => {
        reissuance();
    }, [reissuance]);

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
                        {Object.values(menu).map((detail, index) => {
                            return (
                                <Button key={`button-header-menu-${index}`} startIcon={detail.icon} onClick={() => navigate(detail.path)}>
                                    <span className="span-button-label">{detail.label}</span>
                                </Button>
                            );
                        })}
                    </Grid>
                    <Grid id="grid-header-user-and-mode" item xs="auto">
                        {user.id
                            ? <>
                                <Tooltip title={<>
                                    <p className="p-tooltip">{user.name} ({user.roles[0].value})</p>
                                    <p className="p-tooltip">{user.email}</p>
                                </>} placement="bottom" arrow>
                                    <Avatar>
                                        <Person />
                                    </Avatar>
                                </Tooltip>
                                <Tooltip title="Logout" placement="bottom" arrow>
                                    <Button id="button-logout" variant="outlined">
                                        <Logout />
                                    </Button>
                                </Tooltip>
                            </>
                            : <Button variant="outlined" startIcon={<Login />} onClick={() => setVisibleLogin(true)}>
                                <span className="span-button-label">Login</span>
                            </Button>
                        }
                        <Tooltip title="Light / Dark" placement="bottom-end" arrow>
                            <Button id="button-set-mode" variant="outlined" onClick={() => setMode(!isLight ? 'light' : 'dark')}>
                                {isLight ? <LightModeOutlined /> : <DarkModeOutlined />}
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
            <Popup isVisible={isVisibleLogin} setVisible={setVisibleLogin} width={400} icon={<Login />} label="Login" content={<LoginPopup setVisible={setVisibleLogin} reissuance={reissuance} />} />
        </>
    );
};

export default Header;
