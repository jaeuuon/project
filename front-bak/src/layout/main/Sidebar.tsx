import { useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { close } from 'store/layout/main/sidebar';

import { findGroupByPath, findGroupsByPath, getBorderColor } from 'common/utils';

import Modal from 'components/Modal';

import styles from 'assets/styles/layout/main/sidebar.module.scss';

const Sidebar = () => {
    const dispatch = useAppDispatch();

    const isVisible = useAppSelector((state) => state.sidebar.isVisible);
    const setVisibleFalse = () => dispatch(close());

    const { pathname } = useLocation();

    const findGroups = findGroupsByPath(pathname);
    const findGroupRequiredRoles = (findGroups && findGroupByPath(findGroups.PATH)?.REQUIRED.ROLES) || [];

    const roles = useAppSelector((state) => state.user.roles);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(close());

        window.scrollTo(0, 0);
    }, [pathname]);

    const sidebarRef = useRef<HTMLInputElement>(null);

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

    const { zIndex, palette } = useTheme();

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            <Grid id={styles.sidebar} className={isVisible ? styles.displayInitial : ''} item xs="auto"
                style={{ zIndex: zIndex.modal, borderColor: getBorderColor(palette), backgroundColor: palette.background.paper }}
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