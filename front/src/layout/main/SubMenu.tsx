import { useEffect, useRef, Fragment } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { MENU } from 'constants/layout/header/menu';

import { useAppSelector, useAppDispatch } from 'hooks';
import { close } from 'store/layout/main/subMenu';

import { getBorderColor } from 'common/util';

import Modal from 'components/Modal';

import styles from 'assets/styles/layout/main/sub-menu.module.scss';

const SubMenu = () => {
    const { pathname } = useLocation();
    const roles = useAppSelector(({ user: { roles } }) => roles);

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(close());

        window.scrollTo(0, 0);
    }, [pathname]);

    const dispatch = useAppDispatch();

    const isVisible = useAppSelector(({ subMenu: { isVisible } }) => isVisible);
    const setVisibleFalse = () => dispatch(close());

    const subMenuRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onResize = () => {
            if (subMenuRef.current) {
                const styles = window.getComputedStyle(subMenuRef.current);

                if (styles.position !== 'fixed') {
                    dispatch(close());
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const { zIndex: { modal }, palette } = useTheme();

    return (
        <>
            <Modal isVisible={isVisible} setVisibleFalse={setVisibleFalse} />
            <Grid id={styles.subMenu} className={isVisible ? styles.visible : ''} item xs="auto"
                style={{ zIndex: modal, borderColor: getBorderColor(palette), backgroundColor: palette.background.paper }}
                ref={subMenuRef}
            >
                <List>
                    {Object.values(MENU).filter(({ PATH, SUB_MENUS }) =>
                        (pathname === PATH || SUB_MENUS.some(({ PATH: SUB_PATH }) => pathname === `${PATH}${SUB_PATH}`))
                    ).map(({ PATH, SUB_MENUS }, index) =>
                        <Fragment key={`list-item-main-sub-menu-${index}`}>
                            {SUB_MENUS.filter(({ REQUIRED: { ROLES } }) =>
                                ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code))
                            ).map(({ PATH: SUB_PATH, ICON, LABEL }, subIndex) =>
                                <ListItem key={`list-item-main-sub-menu-${index}-${subIndex}`} disablePadding
                                    onClick={() => SUB_PATH.startsWith('http') ? window.open(SUB_PATH) : navigate(`${PATH}${SUB_PATH}`)}
                                >
                                    <ListItemButton dense>
                                        <ListItemIcon>{ICON}</ListItemIcon>
                                        <ListItemText primary={LABEL} />
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </Fragment>
                    )}
                </List>
            </Grid>
        </>
    );
};

export default SubMenu;
