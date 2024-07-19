import { useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { useAppDispatch, useAppSelector } from 'hooks';
import { close } from 'store/layout/main/sidebar';

import { groups } from 'enums/layout/main/sidebar';
import { group } from 'enums/layout/header/menu';

import { getBorderColor } from 'common/utils';

import Modal from 'components/Modal';

import styles from 'assets/styles/layout/main/sidebar.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Sidebar = () => {
    const sidebarRef = useRef<HTMLInputElement>(null);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const isVisible = useAppSelector((state) => state.sidebar.isVisible);
    const roles = useAppSelector((state) => state.user.roles);

    const theme = useTheme();
    const style = { zIndex: theme.zIndex.modal, backgroundColor: theme.palette.background.paper, borderColor: getBorderColor(theme) };

    const findGroup = groups.find(({ PATH, ITEMS }) => PATH === pathname || ITEMS.some(({ PATH }) => PATH === pathname));
    const groupRequiredRoles = Object.values(group).find(({ PATH }) => PATH === findGroup?.PATH)?.REQUIRED.ROLES || [];

    const setVisibleFalse = () => dispatch(close());

    useEffect(() => {
        dispatch(close());

        window.scrollTo(0, 0);
    }, [pathname]);

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
    }, []);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            <Grid id={styles.grid} className={isVisible ? commonStyles.displayInitial : ''} item xs="auto" style={style} ref={sidebarRef}>
                <List>
                    {findGroup?.ITEMS.map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                        const requiredRoles = REQUIRED.ROLES;
                        const requiredRolesLength = requiredRoles.length;

                        return (
                            <Fragment key={`list-item-main-sidebar-${index}`}>
                                {(
                                    (groupRequiredRoles.length === 0 && requiredRolesLength === 0)
                                    || (groupRequiredRoles.some((groupRequiredRole) => roles.some(({ code }) => groupRequiredRole === code)) && (
                                        requiredRolesLength === 0 || requiredRoles.some((requiredRole) => roles.some(({ code }) => requiredRole === code))
                                    ))
                                ) &&
                                    <ListItem disablePadding onClick={() => PATH.startsWith('http') ? window.open(PATH) : navigate(PATH)}>
                                        <ListItemButton dense>
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
