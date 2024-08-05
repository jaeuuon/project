import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { List as MuiList, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { MENU } from 'constants/layout/header/menu';

import { useAppSelector } from 'hooks';

const List = memo(() => {
    const { pathname } = useLocation();
    const roles = useAppSelector(({ user: { roles } }) => roles);

    const navigate = useNavigate();

    return (
        <MuiList>
            {MENU.find(({ PATH, SUB_MENUS }) =>
                (pathname === PATH || SUB_MENUS.some(({ PATH }) => pathname === PATH))
            )?.SUB_MENUS.filter(({ REQUIRED: { ROLES } }) =>
                ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code))
            ).map(({ PATH, ICON, LABEL }, index) =>
                <ListItem key={`list-item-main-sub-menu-${index}`} disablePadding
                    onClick={() => PATH.startsWith('http') ? window.open(PATH) : navigate(PATH)}
                >
                    <ListItemButton dense>
                        <ListItemIcon>{ICON}</ListItemIcon>
                        <ListItemText primary={LABEL} />
                    </ListItemButton>
                </ListItem>
            )}
        </MuiList>
    );
});

export default List;
