import { useRef, useEffect, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { menus } from 'enums/layout/main/sidebar';

import type { RootState } from 'types/redux';

import { closeSidebar } from 'modules/layout/main/sidebar';

import { getBorderColor } from 'common/utils';

import Modal from 'components/Modal';

const Sidebar = () => {
    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const sidebarRef = useRef<HTMLInputElement>(null);

    const { pathname } = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isVisible } = useSelector((state: RootState) => state.sidebar);
    const { roles } = useSelector((state: RootState) => state.user);

    const subMenus = menus.find(({ PATH, SUB_MENUS }) => PATH === pathname || SUB_MENUS.some(({ PATH }) => PATH === pathname))?.SUB_MENUS;

    const setVisibleFalse = () => dispatch(closeSidebar());

    useEffect(() => {
        dispatch(closeSidebar());

        window.scrollTo(0, 0);
    }, [pathname, dispatch]);

    useEffect(() => {
        const onResize = () => {
            if (sidebarRef?.current) {
                const styles = window.getComputedStyle(sidebarRef.current);

                if (styles.position !== 'fixed') {
                    dispatch(closeSidebar());
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, [dispatch]);

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            <Grid id="layout-main-grid-sidebar" className={isVisible ? 'display-initial' : ''} item xs="auto" style={{ zIndex: theme.zIndex.modal, backgroundColor: theme.palette.background.paper, borderColor }} ref={sidebarRef}>
                <List>
                    {subMenus?.map(({ ICON, PATH, LABEL, HAS_REQUIRED_USER_ROLES }, index) =>
                        <Fragment key={`list-item-main-sidebar-${index}`}>
                            {(HAS_REQUIRED_USER_ROLES.length === 0 || HAS_REQUIRED_USER_ROLES.some((role) => roles.some(({ code }) => role === code))) &&
                                <ListItem disablePadding onClick={() => PATH.startsWith('http') ? window.open(PATH) : navigate(PATH)}>
                                    <ListItemButton>
                                        <ListItemIcon>{ICON}</ListItemIcon>
                                        <ListItemText primary={LABEL} />
                                    </ListItemButton>
                                </ListItem>
                            }
                        </Fragment>
                    )}
                </List>
            </Grid>
        </>
    );
};

export default Sidebar;
