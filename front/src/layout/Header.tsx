import { useState, useEffect } from 'react';

import { useTheme, Box, Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getBorderColor, getGreyBackgroundColor } from 'common/util';

import Logo from 'layout/header/Logo';
import SubMenu from 'layout/header/SubMenu';
import Menu from 'layout/header/Menu';
import User from 'layout/header/User';
import Mode from 'layout/header/Mode';

import styles from 'assets/styles/layout/header.module.scss';

const Header = () => {
    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0);

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const { zIndex: { appBar: zIndex }, palette } = useTheme();
    const mode = useAppSelector(({ palette: { mode } }) => mode);

    return (
        <Box id={styles.header} boxShadow={!isTop ? 2 : 0}
            style={{ zIndex, borderColor: getBorderColor(palette), backgroundColor: getGreyBackgroundColor(mode) }}
        >
            <Grid container>
                <SubMenu />
                <Logo />
                <Menu />
                <User />
                <Mode />
            </Grid>
        </Box>
    );
};

export default Header;
