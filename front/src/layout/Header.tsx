import { useState, useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Login } from '@mui/icons-material';

import { status } from 'enums/apis/status';
import { reissuanceIgnoreError } from 'enums/apis/layout/header';

import type HeaderType from 'types/layout/header';
import type { default as LoginContent } from 'types/apis/pages/popup/login';

import { setUser, initUser } from 'modules/layout/header/user';
import { setSnackbarSuccess, setSnackbarError } from 'modules/layout/snackbar';

import { putReissuance } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getCssClassByTheme, getBorderColor, includesCode } from 'common/utils';

import Icon from 'layout/header/Icon';
import Menu from 'layout/header/Menu';
import User from 'layout/header/User';
import LogInOut from 'layout/header/LogInOut';
import Mode from 'layout/header/Mode';

import Popup from 'layout/Popup';
import LoginPopup from 'pages/popup/Login';

const Header = ({ setMode }: HeaderType) => {
    const dispatch = useDispatch();

    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const [isTop, setTop] = useState(true);
    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const setVisibleLoginTrue = () => setVisibleLogin(true);
    const setVisibleLoginFalse = () => setVisibleLogin(false);

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
        const onScroll = () => setTop(window.scrollY === 0 && true);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div id="div-header" className={[getCssClassByTheme(theme), (isTop ? 'box-shadow-none' : '')].join(' ')} style={{ borderColor }}>
                <Grid id="grid-header" container>
                    <Icon />
                    <Menu />
                    <Grid id="grid-header-user-and-mode" item xs="auto">
                        <User />
                        <LogInOut setVisibleLoginTrue={setVisibleLoginTrue} />
                        <Mode setMode={setMode} />
                    </Grid>
                </Grid>
            </div>
            <Popup isVisible={isVisibleLogin} setVisibleFalse={setVisibleLoginFalse} width={400} icon={<Login />} label="Login" content={
                <LoginPopup setVisibleFalse={setVisibleLoginFalse} reissuance={reissuance} />
            } />
        </>
    );
};

export default Header;
