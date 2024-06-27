import { useState } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Avatar, Tooltip } from '@mui/material';
import { Person } from '@mui/icons-material';

import { RootState } from 'modules';

import { getBorderColor, getHoverBackgroundColor } from 'common/utils';

const User = () => {
    const user = useSelector((state: RootState) => state.user);

    const theme = useTheme();
    const borderColor = getBorderColor(theme);
    const hoverBackgroundColor = getHoverBackgroundColor(theme);

    const [isMouseHover, setMouseHover] = useState(false);

    return (
        <>
            {user.id &&
                <div id="div-header-user" onMouseEnter={() => setMouseHover(true)} onMouseLeave={() => setMouseHover(false)}>
                    <Tooltip title={
                        <>
                            <p className="p-tooltip">{user.name} ({user.roles[0].value})</p>
                            <p className="p-tooltip">{user.email}</p>
                        </>
                    } placement="bottom" arrow>
                        <Avatar style={{
                            borderColor: isMouseHover ? theme.palette.primary.main : borderColor,
                            backgroundColor: isMouseHover ? hoverBackgroundColor : theme.palette.grey[400]
                        }}>
                            <Person />
                        </Avatar>
                    </Tooltip>
                </div>
            }
        </>
    );
};

export default User;
