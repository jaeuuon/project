import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getBorderColor, getBackgroundColor } from 'common/utils';

import Logo from 'layout/header/Logo';
import Sidebar from 'layout/header/Sidebar';
import Menu from 'layout/header/Menu';
import User from 'layout/header/User';
import Mode from 'layout/header/Mode';

import styles from 'assets/styles/layout/header.module.scss';

const Header = () => {
    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const { zIndex, palette } = useTheme();
    const mode = useAppSelector((state) => state.mode.value);

    return (
        <Box id={styles.header} boxShadow={!isTop ? 2 : 0}
            style={{ zIndex: zIndex.appBar, borderColor: getBorderColor(palette), backgroundColor: getBackgroundColor(palette, mode) }}
        >
            <Grid id={styles.grid} container>
                <Sidebar />
                <Logo />
                <Menu />
                <User />
                <Mode />
            </Grid>
        </Box>
    );
};

export default Header;
