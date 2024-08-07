import { memo, useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Grid, Button, Tooltip } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';

import { PATH } from 'constants/layout/header/menu';
import { STATUS } from 'constants/apis/response';
import { REISSUANCE_IGNORED_ERROR } from 'constants/apis/security/codeMessage';

import { useAppSelector, useAppDispatch } from 'hooks';
import { init, set } from 'store/user';
import { success, error } from 'store/layout/snackbar';

import { logout, reissuance } from 'apis/security/authentication';

import { getPayload, getUser, getDelay } from 'common/jwt';
import { includesCode } from 'common/util';

import Avatar from 'components/Avatar';
import Popup from 'components/Popup';
import LoginPopup from 'pages/popup/Login';

import styles from 'assets/styles/layout/header/user.module.scss';

const User = memo(() => {
    const { id, email, name, roles: [role] } = useAppSelector(({ user }) => user);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onClickLogout = async () => {
        const { status, data: { code, message } } = await logout();

        if (status === STATUS.SUCCESS) {
            dispatch(init());
            dispatch(success({ code, message }));

            navigate(PATH.HOME);
        } else {
            dispatch(error({ code, message }));
        }
    };

    const [isVisibleLogin, setVisibleLogin] = useState(false);
    const setVisibleLoginTrue = () => setVisibleLogin(true);
    const setVisibleLoginFalse = () => setVisibleLogin(false);

    const { pathname } = useLocation();

    useEffect(() => {
        setVisibleLoginFalse();
    }, [pathname]);

    const scheduler = useCallback(async () => {
        const { status, data: { code, message, content: [content] } } = await reissuance();

        if (status === STATUS.SUCCESS) {
            const payload = getPayload(content.access);
            const user = getUser(payload);

            dispatch(set(user));
            dispatch(success({ code, message }));

            setTimeout(scheduler, getDelay(payload));
        } else {
            dispatch(init());

            if (!includesCode(REISSUANCE_IGNORED_ERROR, code)) {
                dispatch(error({ code, message }));
            }
        }
    }, []);

    useEffect(() => {
        scheduler();
    }, []);

    return (
        <Grid id={styles.user} item xs="auto">
            {id
                ? <Grid container>
                    <Grid id={styles.avatar} item xs="auto">
                        <Avatar email={email} name={name} role={role} isHeader />
                    </Grid>
                    <Grid item xs="auto">
                        <Tooltip placement="bottom-end" arrow title="Logout">
                            <Button id={styles.logout} variant="outlined" onClick={onClickLogout}>
                                <Logout />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                : <>
                    <Tooltip placement="bottom-end" arrow title="Login">
                        <Button id={styles.login} variant="outlined" onClick={setVisibleLoginTrue}>
                            <Login />
                        </Button>
                    </Tooltip>
                    <Popup width={420} icon={<Login />} label="Login" isVisible={isVisibleLogin} setVisibleFalse={setVisibleLoginFalse}>
                        <LoginPopup scheduler={scheduler} setVisibleFalse={setVisibleLoginFalse} />
                    </Popup>
                </>
            }
        </Grid>
    );
});

export default User;
