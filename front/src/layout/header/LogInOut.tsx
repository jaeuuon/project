import { useDispatch, useSelector } from 'react-redux';

import { Button, Tooltip } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';

import { status } from 'enums/apis/status';

import type LogInOutType from 'types/layout/header/logInOut';

import { RootState } from 'modules';
import { initUser } from 'modules/layout/header/user';

import { deleteLogout } from 'apis/pages/popup/login';

const LogInOut = ({
    setSeverity, setCodeMessage,
    setVisibleLoginTrue
}: LogInOutType) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const onClick = async () => {
        const { status: responseStatus, data } = await deleteLogout();
        const { code, message } = data;

        if (responseStatus === status.SUCCESS) {
            dispatch(initUser());

            setSeverity('success');
        } else {
            setSeverity('error');
        }

        setCodeMessage({ code, message });
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
