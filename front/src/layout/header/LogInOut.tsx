import { useDispatch, useSelector } from 'react-redux';

import { Button, Tooltip } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';

import { status } from 'enums/apis/status';

import type LogInOutType from 'types/layout/header/logInOut';

import { RootState } from 'modules';
import { initUser } from 'modules/user';

import { deleteLogout } from 'apis/pages/popup/login';

const LogInOut = ({ setVisibleLoginTrue }: LogInOutType) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const onClick = async () => {
        const { status: responseStatus, errors } = await deleteLogout();

        if (responseStatus === status.SUCCESS) {
            dispatch(initUser());
        } else {
            // 알림 표시.
            // const { code, message } = errors[0];
        }
    };

    return (
        <>
            {user.id
                ? <Tooltip title="Logout" placement="bottom" arrow>
                    <Button id="button-logout" variant="outlined" onClick={onClick}>
                        <Logout />
                    </Button>
                </Tooltip>
                : <Button variant="outlined" startIcon={<Login />} onClick={setVisibleLoginTrue}>
                    <span className="span-button-label">Login</span>
                </Button>
            }
        </>
    );
};

export default LogInOut;
