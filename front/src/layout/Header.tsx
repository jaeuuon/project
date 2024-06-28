import { useState, useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Login } from '@mui/icons-material';

import { status } from 'enums/apis/status';
import { reissuanceIgnoreError } from 'enums/apis/layout/header';

import type HeaderType from 'types/layout/header';
import type { default as LoginContent } from 'types/apis/pages/popup/login';
import type { Error } from 'types/apis/common';

import { initUser, setUser } from 'modules/user';

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

import Snackbar from 'components/common/Snackbar';

const Header = ({ setMode }: HeaderType) => {
    const dispatch = useDispatch();

    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const [isTop, setTop] = useState(true);
    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const [error, setError] = useState<Error>();
    const [isVisibleError, setVisibleError] = useState(false);

    const setVisibleLoginTrue = () => setVisibleLogin(true);
    const setVisibleLoginFalse = () => setVisibleLogin(false);

    const setVisibleErrorTrue = () => setVisibleError(true);
    const setVisibleErrorFalse = () => setVisibleError(false);

    const reissuance = useCallback(async () => {
        const { status: responseStatus, data, errors } = await putReissuance();

        if (responseStatus === status.SUCCESS) {
            const { access }: LoginContent = data.content[0];

            const payload = getPayload(access);
            const user = getUser(payload);

            dispatch(setUser(user));

            setTimeout(reissuance, getDelay(payload));
        } else {
            dispatch(initUser());

            const error = errors[0];

            if (!includesCode(reissuanceIgnoreError, error.code)) {
                setError(error);
                setVisibleError(true);
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
                        <LogInOut setError={setError} setVisibleErrorTrue={setVisibleErrorTrue} setVisibleLoginTrue={setVisibleLoginTrue} />
                        <Mode setMode={setMode} />
                    </Grid>
                </Grid>
            </div>
            <Popup isVisible={isVisibleLogin} setVisibleFalse={setVisibleLoginFalse} width={400} icon={<Login />} label="Login" content={
                <LoginPopup setVisibleFalse={setVisibleLoginFalse} reissuance={reissuance} />
            } />
            <Snackbar isVisible={isVisibleError} setVisibleFalse={setVisibleErrorFalse} error={error} />
        </>
    );
};

export default Header;
