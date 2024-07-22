import { useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { group } from 'enums/layout/header/menu';

import { close } from 'store/layout/main/sidebar';

import { findGroupsByPath, findGroupByPath, getBorderColor } from 'common/utils';

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

    const findGroups = findGroupsByPath(pathname);
    const findGroupRequiredRoles = findGroupByPath(findGroups?.PATH)?.REQUIRED.ROLES || [];

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
            <Grid id={styles.sidebar} className={isVisible ? commonStyles.displayInitial : ''} item xs="auto"
                style={{ zIndex: theme.zIndex.modal, borderColor: getBorderColor(theme), backgroundColor: theme.palette.background.paper }}
                ref={sidebarRef}
            >
                <List>
                    {findGroups?.ITEMS.map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                        const requiredRoles = REQUIRED.ROLES;
                        const requiredRolesLength = requiredRoles.length;

                        return (
                            <Fragment key={`list-item-main-sidebar-${index}`}>
                                {(
                                    (findGroupRequiredRoles.length === 0 && requiredRolesLength === 0)
                                    || (findGroupRequiredRoles.some((findGroupRequiredRole) => roles.some(({ code }) => findGroupRequiredRole === code)) && (
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
