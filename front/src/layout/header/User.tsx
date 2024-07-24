import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, Avatar, Button, Tooltip } from '@mui/material';
import { Person, Logout, Login } from '@mui/icons-material';

import { group } from 'enums/layout/header/menu';
import { status } from 'enums/apis/response';
import { ignoredReissuanceError } from 'enums/apis/layout/header/user';

import { useAppSelector, useAppDispatch } from 'hooks';
import { init, set } from 'store/layout/header/user';
import { success, error } from 'store/layout/snackbar';

import { logout, reissuance } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/jwt';
import { getBorderColor, includesCode } from 'common/utils';

import Popup from 'components/Popup';
import LoginPopup from 'pages/popup/Login';

import styles from 'assets/styles/layout/header/user.module.scss';
import headerStyles from 'assets/styles/layout/header.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const User = () => {
    const { id, email, name, roles } = useAppSelector((state) => state.user);

    const [isMouseHover, setMouseHover] = useState(false);

    const onMouseEnter = () => setMouseHover(true);
    const onMouseLeave = () => setMouseHover(false);

    const navigate = useNavigate();

    const onClickAvatar = () => navigate(group.SECURITY.PATH);

    const dispatch = useAppDispatch();

    const onClickLogout = async () => {
        const { status: responseStatus, data } = await logout();
        const { code, message } = data;

        if (responseStatus === status.SUCCESS) {
            dispatch(init());
            dispatch(success({ code, message }));

            navigate(group.HOME.PATH);
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
        const { status: responseStatus, data } = await reissuance();
        const { code, message, content } = data;

        if (responseStatus === status.SUCCESS) {
            const { access } = content[0];

            const payload = getPayload(access);
            const user = getUser(payload);

            dispatch(set(user));
            dispatch(success({ code, message }));

            setTimeout(scheduler, getDelay(payload));
        } else {
            dispatch(init());

            if (!includesCode(ignoredReissuanceError, code)) {
                dispatch(error({ code, message }));
            }
        }
    }, []);

    useEffect(() => {
        scheduler();
    }, []);

    const theme = useTheme();

    return (
        <Grid id={styles.user} item xs="auto">
            {id
                ? <Grid container>
                    <Grid item xs="auto">
                        <div id={styles.div} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                            <Tooltip placement="bottom" arrow
                                title={
                                    <>
                                        <p>{name} ({roles[0].value})</p>
                                        <p>{email}</p>
                                    </>
                                }
                            >
                                <Avatar id={styles.avatar}
                                    style={{
                                        borderColor: isMouseHover ? theme.palette.primary.main : getBorderColor(theme),
                                        backgroundColor: `${theme.palette.grey[400]}${isMouseHover ? Math.round(255 - (255 * theme.palette.action.hoverOpacity)).toString(16).padStart(2, '0') : ''}`
                                    }}
                                    onClick={onClickAvatar}
                                >
                                    <Person />
                                </Avatar>
                            </Tooltip>
                        </div>
                    </Grid>
                    <Grid item xs="auto">
                        <Tooltip placement="bottom" arrow title="Logout">
                            <Button id={styles.logout} variant="outlined" onClick={onClickLogout}>
                                <Logout />
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
                : <Button id={styles.login} className={headerStyles.button} variant="outlined" startIcon={<Login />} onClick={setVisibleLoginTrue}>
                    <span className={commonStyles.displayNoneMd}>Login</span>
                </Button>
            }
            <Popup isVisible={isVisibleLogin} setVisibleFalse={setVisibleLoginFalse} width={400} icon={<Login />} label="Login"
                content={
                    <LoginPopup setVisibleFalse={setVisibleLoginFalse} scheduler={scheduler} />
                }
            />
        </Grid>
    );
};

export default User;
