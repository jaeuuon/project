import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Avatar, Button, Tooltip } from '@mui/material';
import { Person, Logout, Login } from '@mui/icons-material';

import { status } from 'enums/apis/status';
import { reissuanceIgnoreError } from 'enums/apis/layout/header';

import type { default as LoginContent } from 'types/apis/pages/popup/login';

import { RootState } from 'modules';
import { initUser, setUser } from 'modules/layout/header/user';
import { setSnackbarSuccess, setSnackbarError } from 'modules/layout/snackbar';

import { deleteLogout, putReissuance } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getBorderColor, getHoverBackgroundColor, includesCode } from 'common/utils';

import Popup from 'layout/Popup';
import LoginPopup from 'pages/popup/Login';

const User = () => {
    const theme = useTheme();

    const { pathname } = useLocation();

    const dispatch = useDispatch();
    const { id, email, name, roles } = useSelector((state: RootState) => state.user);

    const [isMouseHover, setMouseHover] = useState(false);

    const borderColor = isMouseHover ? theme.palette.primary.main : getBorderColor(theme);
    const backgroundColor = isMouseHover ? getHoverBackgroundColor(theme) : theme.palette.grey[400];

    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const onMouseEnter = () => setMouseHover(true);
    const onMouseLeave = () => setMouseHover(false);

    const setVisibleLoginTrue = () => setVisibleLogin(true);
    const setVisibleLoginFalse = () => setVisibleLogin(false);

    const onClick = async () => {
        const { status: responseStatus, data } = await deleteLogout();
        const { code, message } = data;

        if (responseStatus === status.SUCCESS) {
            dispatch(initUser());
            dispatch(setSnackbarSuccess({ code, message }));
        } else {
            dispatch(setSnackbarError({ code, message }));
        }
    };

    const reissuance = useCallback(async () => {
        const { status: responseStatus, data } = await putReissuance();
        const { code, message } = data;

        if (responseStatus === status.SUCCESS) {
            const { access }: LoginContent = data.content[0];

            const payload = getPayload(access);
            const user = getUser(payload);

            dispatch(setUser(user));

            dispatch(setSnackbarSuccess({ code, message }));

            setTimeout(reissuance, getDelay(payload));
        } else {
            dispatch(initUser());

            if (!includesCode(reissuanceIgnoreError, code)) {
                dispatch(setSnackbarError({ code, message }));
            }
        }
    }, [dispatch]);

    useEffect(() => {
        reissuance();
    }, [reissuance]);

    useEffect(() => {
        setVisibleLoginFalse();
    }, [pathname]);

    return (
        <>
            {id
                ? <>
                    <div id="layout-header-grid-user-avatar" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Tooltip title={
                            <>
                                <p>
                                    {name}
                                    {roles && roles.length > 0 &&
                                        <> ({roles[0].value})</>
                                    }
                                </p>
                                <p>{email}</p>
                            </>
                        } placement="bottom" arrow>
                            <Avatar style={{ borderColor, backgroundColor }}>
                                <Person />
                            </Avatar>
                        </Tooltip>
                    </div>
                    <Tooltip title="Logout" placement="bottom" arrow>
                        <Button id="button-logout" variant="outlined" onClick={onClick}>
                            <Logout />
                        </Button>
                    </Tooltip>
                </>
                : <>
                    <Button variant="outlined" startIcon={<Login />} onClick={setVisibleLoginTrue}>
                        <span className="display-none-sm">Login</span>
                    </Button>
                </>
            }
            <Popup isVisible={isVisibleLogin} setVisibleFalse={setVisibleLoginFalse} width={400} icon={<Login />} label="Login" content={
                <LoginPopup setVisibleFalse={setVisibleLoginFalse} reissuance={reissuance} />
            } />
        </>
    );
};

export default User;
