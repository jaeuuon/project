import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useTheme, Avatar as MuiAvatar, Tooltip } from '@mui/material';
import { Person } from '@mui/icons-material';

import type Component from 'types/components/avatar';

import { PATH } from 'constants/layout/header/menu';

import { getBorderColor } from 'common/util';

import styles from 'assets/styles/components/avatar.module.scss';

const Avatar = ({
    email, name, role: { value },
    isHeader
}: Component) => {
    const [isMouseHover, setMouseHover] = useState(false);
    const onMouseEnter = () => setMouseHover(true);
    const onMouseLeave = () => setMouseHover(false);

    const navigate = useNavigate();
    const onClickAvatar = () => {
        if (isHeader) {
            navigate(PATH.SECURITY);
        }
    };

    const { palette } = useTheme();

    return (
        <Tooltip placement="bottom" arrow
            title={
                <>
                    <p>{name} ({value})</p>
                    <p>{email}</p>
                </>
            }
        >
            <MuiAvatar className={styles.avatar} style={{ borderColor: isMouseHover ? palette.primary.main : getBorderColor(palette) }}
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onClick={onClickAvatar}
            >
                <Person />
            </MuiAvatar>
        </Tooltip>
    );
};

export default Avatar;
