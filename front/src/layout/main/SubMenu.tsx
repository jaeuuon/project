import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme, Grid } from '@mui/material';

import { useAppSelector, useAppDispatch } from 'hooks';
import { close } from 'store/layout/main/subMenu';

import { getBorderColor } from 'common/util';

import Modal from 'components/Modal';
import List from 'layout/main/subMenu/List';

import styles from 'assets/styles/layout/main/sub-menu.module.scss';

const SubMenu = () => {
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(close());

        window.scrollTo(0, 0);
    }, [pathname]);

    const isVisible = useAppSelector(({ subMenu: { isVisible } }) => isVisible);
    const setVisibleFalse = () => dispatch(close());

    const subMenuRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onResize = () => {
            const { current } = subMenuRef;

            if (current) {
                const { position } = window.getComputedStyle(current);

                if (position !== 'fixed') {
                    dispatch(close());
                }
            }
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const { zIndex: { modal: zIndex }, palette } = useTheme();

    return (
        <>
            {isVisible &&
                <Modal setVisibleFalse={setVisibleFalse} />
            }
            <Grid id={styles.subMenu} className={isVisible ? styles.visible : ''} item xs="auto"
                style={{ zIndex, borderColor: getBorderColor(palette), backgroundColor: palette.background.paper }}
                ref={subMenuRef}
            >
                <List />
            </Grid>
        </>
    );
};

export default SubMenu;
