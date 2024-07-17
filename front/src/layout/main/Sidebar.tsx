import { useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import type { RootState } from 'types/modules';

import { menus } from 'enums/layout/main/sidebar';
import { menu as originHeaderMenu } from 'enums/layout/header/menu';

import { close } from 'modules/layout/main/sidebar';

import { getBorderColor } from 'common/utils';

import Modal from 'components/Modal';

const Sidebar = () => {
    const sidebarRef = useRef<HTMLInputElement>(null);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isVisible } = useSelector((state: RootState) => state.sidebar);
    const { roles } = useSelector((state: RootState) => state.user);

    const theme = useTheme();
    const style = { zIndex: theme.zIndex.modal, backgroundColor: theme.palette.background.paper, borderColor: getBorderColor(theme) };

    const headerMenu = menus.find(({ PATH, MENUS }) => PATH === pathname || MENUS.some(({ PATH }) => PATH === pathname));
    const headerMenuRequiredRoles = Object.values(originHeaderMenu).find(({ PATH }) => PATH === headerMenu?.PATH)?.REQUIRED.ROLES || [];

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
                    {headerMenu?.MENUS.map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                        const requiredRoles = REQUIRED.ROLES;
                        const requiredRolesLength = requiredRoles.length;

                        return (
                            <Fragment key={`list-item-main-sidebar-${index}`}>
                                {(
                                    (headerMenuRequiredRoles.length === 0 && requiredRolesLength === 0)
                                    || (headerMenuRequiredRoles.some((headerMenuRequiredRole) => roles.some(({ code }) => headerMenuRequiredRole === code)) && (
                                        requiredRolesLength === 0 || requiredRoles.some((requiredRole) => roles.some(({ code }) => requiredRole === code))
                                    ))
                                ) &&
                                    <ListItem disablePadding onClick={() => PATH.startsWith('http') ? window.open(PATH) : navigate(PATH)}>
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
