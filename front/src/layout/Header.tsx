import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getBorderColor, getBackgroundColor } from 'common/util';

import Logo from 'layout/header/Logo';
import SubMenu from 'layout/header/SubMenu';
import Menu from 'layout/header/Menu';
import Mode from 'layout/header/Mode';

import styles from 'assets/styles/layout/header.module.scss';

const Header = () => {
    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const { zIndex: { appBar }, palette } = useTheme();
    const mode = useAppSelector(({ palette: { mode } }) => mode);

    return (
        <Box id={styles.header} boxShadow={!isTop ? 2 : 0}
            style={{ zIndex: appBar, borderColor: getBorderColor(palette), backgroundColor: getBackgroundColor(palette, mode) }}
        >
            <Grid id={styles.grid} container>
                <SubMenu />
                <Logo />
                <Menu />
                <Mode />
            </Grid>
        </Box>
    );
};

export default Header;
