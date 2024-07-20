import { useState, useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'hooks';

import { useTheme } from '@mui/material/styles';
import { Grid, Avatar, Button, Tooltip } from '@mui/material';
import { Person, Logout, Login } from '@mui/icons-material';

import { group } from 'enums/layout/header/menu';
import { status } from 'enums/apis/response';
import { ignoredReissuanceError } from 'enums/apis/layout/header/user';

import { init, set } from 'store/layout/header/user';
import { success, error } from 'store/layout/snackbar';

import { logout, reissuance } from 'apis/pages/popup/login';

import { getPayload, getUser, getDelay } from 'common/payload';
import { getBorderColor, includesCode } from 'common/utils';

import styles from 'assets/styles/layout/header/user.module.scss';
import headerStyles from 'assets/styles/layout/header.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const User = () => {
    const [isMouseHover, setMouseHover] = useState(false);
    const [isVisibleLogin, setVisibleLogin] = useState(false);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { id, email, name, roles } = useAppSelector((state) => state.user);

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

    const onClickAvatar = () => navigate(group.SECURITY.PATH);

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

    useEffect(() => {
        setVisibleLoginFalse();
    }, [pathname]);

    return (
        <Grid id={styles.grid} item xs="auto">
            {id
                ? <>
                    <div id={styles.div} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                        <Tooltip placement="bottom" arrow
                            title={
                                <>
                                    <p>{name} ({roles[0].value})</p>
                                    <p>{email}</p>
                                </>
                            }
                        >
                            <Avatar id={styles.avatar} style={avatarStyle} onClick={onClickAvatar}>
                                <Person />
                            </Avatar>
                        </Tooltip>
                    </div>
                    <Tooltip placement="bottom" arrow title="Logout">
                        <Button id={styles.logout} variant="outlined" onClick={onClickLogout}>
                            <Logout />
                        </Button>
                    </Tooltip>
                </>
                : <Button id={styles.login} className={headerStyles.button} variant="outlined" startIcon={<Login />} onClick={setVisibleLoginTrue}>
                    <span className={commonStyles.displayNoneMd}>Login</span>
                </Button>
            }
        </Grid>
    );
};

export default User;
