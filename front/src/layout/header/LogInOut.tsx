import { useSelector } from 'react-redux';

import { Button, Tooltip } from '@mui/material';
import { Logout, Login } from '@mui/icons-material';

import type LogInOutType from 'types/layout/header/logInOut';

import { RootState } from 'modules';

const LogInOut = ({ setVisibleLogin }: LogInOutType) => {
    const user = useSelector((state: RootState) => state.user);

    const onClick = () => setVisibleLogin(true);

    return (
        <>
            {user.id
                ? <Tooltip title="Logout" placement="bottom" arrow>
                    <Button id="button-logout" variant="outlined">
                        <Logout />
                    </Button>
                </Tooltip>
                : <Button variant="outlined" startIcon={<Login />} onClick={onClick}>
                    <span className="span-button-label">Login</span>
                </Button>
            }
        </>
    );
};

export default LogInOut;
