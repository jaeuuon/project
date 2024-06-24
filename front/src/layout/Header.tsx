import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, Button, Avatar, Tooltip } from '@mui/material';
import { Person, Logout, Login, LightModeOutlined, DarkModeOutlined } from '@mui/icons-material';

import constant from 'common/constant';

import { status } from 'enums/apis/status';

import type HeaderType from 'types/layout/header';
import type { Detail } from 'types/layout/menu';
import type { default as LoginContent } from 'types/apis/pages/popup/login';
import type User from 'types/user';

import { RootState } from 'modules';
import { set } from 'modules/user';

import { putReissuance } from 'apis/pages/popup/login';

import Popup from 'layout/Popup';
import LoginPopup from 'pages/popup/Login';

import { isThemeLight, getCssClassByTheme, getPayload, getUserByPayload } from 'common/utils';

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
            const user = getUserByPayload(getPayload(access));

            dispatch(set(user));

            const delay = getDelay(user);

            if (delay > 0) {
                setTimeout(reissuance, delay);
            }
        } else if (user.id) {
            // redux 유저 삭제.
            // 알림 표시.
        }
    }, [dispatch]);

    const getDelay = ({ exp }: User) => exp ? (exp * 1000) - 30000 - Date.now() : 0;

    useEffect(() => {
        reissuance();
    }, [reissuance]);

    useEffect(() => {
        const delay = getDelay(user);

        if (delay > 0) {
            setTimeout(reissuance, delay);
        }
    }, [user, reissuance]);

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
                        {user.id
                            ? <>
                                <Tooltip title={<>
                                    <p className="p-tooltip">{user.name} ({user.roles[0].VALUE})</p>
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
            <Popup isVisible={isVisibleLogin} setVisible={setVisibleLogin} width={400} icon={<Login />} label="Login" content={<LoginPopup setVisible={setVisibleLogin} />} />
        </>
    );
};

export default Header;
