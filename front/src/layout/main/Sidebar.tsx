import { useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import type { State } from 'types/modules';

import { menus } from 'enums/layout/main/sidebar';
import { menu as headerMenu } from 'enums/layout/header/menu';

import { close } from 'modules/layout/main/sidebar';

import { getBorderColor } from 'common/utils';

import Modal from 'components/Modal';

const Sidebar = () => {
    const sidebarRef = useRef<HTMLInputElement>(null);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isVisible } = useSelector((state: State) => state.sidebar);
    const { roles } = useSelector((state: State) => state.user);

    const theme = useTheme();
    const style = { zIndex: theme.zIndex.modal, backgroundColor: theme.palette.background.paper, borderColor: getBorderColor(theme) };

    const menu = menus.find(({ PATH, SUB_MENUS }) => PATH === pathname || SUB_MENUS.some(({ PATH: SUB_MENU_PATH }) => `${PATH}${SUB_MENU_PATH}` === pathname));
    const parentMenu = Object.values(headerMenu).find(({ PATH }) => PATH === menu?.PATH);
    const parentMenuRequiredRoles = parentMenu?.REQUIRED.ROLES || [];

    const setVisibleFalse = () => dispatch(close());

    useEffect(() => {
        dispatch(close());

        window.scrollTo(0, 0);
    }, [pathname, dispatch]);

    useEffect(() => {
        const onResize = () => {
            if (sidebarRef?.current) {
                const styles = window.getComputedStyle(sidebarRef.current);

                if (styles.position !== 'fixed') {
                    dispatch(close());
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [dispatch]);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            <Grid id="layout-main-grid-sidebar" className={isVisible ? 'display-initial' : ''} item xs="auto" style={style} ref={sidebarRef}>
                <List>
                    {menu?.SUB_MENUS.map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                        const requiredRoles = REQUIRED.ROLES;
                        const requiredRolesLength = requiredRoles.length;

                        return (
                            <Fragment key={`list-item-main-sidebar-${index}`}>
                                {((parentMenuRequiredRoles.length === 0 && requiredRolesLength === 0)
                                    || (parentMenuRequiredRoles.some((parentMenuRequiredRole) => roles.some(({ code }) => parentMenuRequiredRole === code)) && (
                                        requiredRolesLength === 0 || requiredRoles.some((requiredRole) => roles.some(({ code }) => requiredRole === code))
                                    ))
                                ) &&
                                    <ListItem disablePadding onClick={() => PATH.startsWith('http') ? window.open(PATH) : navigate(`${parentMenu?.PATH || ''}${PATH}`)}>
                                        <ListItemButton>
                                            <ListItemIcon>{ICON}</ListItemIcon>
                                            <ListItemText primary={LABEL} />
                                        </ListItemButton>
                                    </ListItem>
                                }
                            </Fragment>
                        );
                    })}
                </List>
            </Grid>
        </>
    );
};

export default Sidebar;
