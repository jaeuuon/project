import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, Avatar, Button, Tooltip } from '@mui/material';
import { Person, Logout, Login } from '@mui/icons-material';

import type { State } from 'types/modules';
import type { Content } from 'types/apis/pages/popup/login';

import { menu } from 'enums/layout/header/menu';
import { status } from 'enums/apis/response';
import { ignoreReissuanceError } from 'enums/apis/layout/header/user';

import { init, set } from 'modules/layout/header/user';
import { setSuccess, setError } from 'modules/layout/snackbar';

import { logout, reissuance } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getBorderColor, includesCode } from 'common/utils';

import Popup from 'layout/Popup';
import LoginPopup from 'pages/popup/Login';

const User = () => {
    const [isMouseHover, setMouseHover] = useState(false);
    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { id, email, name, roles } = useSelector((state: State) => state.user);

    const theme = useTheme();
    const avatarStyle = {
        borderColor: isMouseHover ? theme.palette.primary.main : getBorderColor(theme),
        backgroundColor: isMouseHover
            ? `${theme.palette.grey[400]}${Math.round(255 - (255 * theme.palette.action.hoverOpacity)).toString(16).padStart(2, '0')}`
            : theme.palette.grey[400]
    };

    const onMouseEnter = () => setMouseHover(true);
    const onMouseLeave = () => setMouseHover(false);

    const setVisibleLoginTrue = () => setVisibleLogin(true);
    const setVisibleLoginFalse = () => setVisibleLogin(false);

    const onClickAvatar = () => navigate(menu.SECURITY.PATH);

    const onClickLogout = async () => {
        const { status: responseStatus, data } = await logout();
        const { code, message } = data;

        if (responseStatus === status.SUCCESS) {
            dispatch(init());
            dispatch(setSuccess({ code, message }));

            navigate(menu.HOME.PATH);
        } else {
            dispatch(setError({ code, message }));
        }
    };

    const scheduler = useCallback(async () => {
        const { status: responseStatus, data } = await reissuance();
        const { code, message } = data;

        if (responseStatus === status.SUCCESS) {
            const { access }: Content = data.content[0];

            const payload = getPayload(access);
            const user = getUser(payload);

            dispatch(set(user));
            dispatch(setSuccess({ code, message }));

            setTimeout(scheduler, getDelay(payload));
        } else {
            dispatch(init());

            if (!includesCode(ignoreReissuanceError, code)) {
                dispatch(setError({ code, message }));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        scheduler();
    }, [scheduler]);

    useEffect(() => {
        setVisibleLoginFalse();
    }, [pathname]);

    return (
        <Grid id="layout-header-grid-user" item xs="auto">
            {id
                ? <>
                    <div id="layout-header-grid-user-avatar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Tooltip placement="bottom" arrow
                            title={
                                <>
                                    <p>{name} ({roles[0].value})</p>
                                    <p>{email}</p>
                                </>
                            }
                        >
                            <Avatar style={avatarStyle} onClick={onClickAvatar}>
                                <Person />
                            </Avatar>
                        </Tooltip>
                    </div>
                    <Tooltip placement="bottom" arrow title="Logout">
                        <Button id="button-logout" className="button-header" variant="outlined" onClick={onClickLogout}>
                            <Logout />
                        </Button>
                    </Tooltip>
                </>
                : <Button id="button-login" className="button-header" variant="outlined" startIcon={<Login />} onClick={setVisibleLoginTrue}>
                    <span className="display-none-md">Login</span>
                </Button>
            }
            <Popup isVisible={isVisibleLogin} setVisibleFalse={setVisibleLoginFalse} width={400} icon={<Login />} label="Login" content={
                <LoginPopup setVisibleFalse={setVisibleLoginFalse} scheduler={scheduler} />
            } />
        </Grid>
    );
};

export default User;
