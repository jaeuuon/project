import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Grid, Box, Button } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import { useAppSelector } from 'hooks';

import { getBorderColor, getGreyBackgroundColor } from 'common/util';

import SubMenu from 'layout/main/SubMenu';
import Content from 'layout/main/Content';

import styles from 'assets/styles/layout/main.module.scss';

const onClick = () => window.scroll({ top: 0, behavior: 'smooth' });

const Main = () => {
    const [isVisibleToTop, setVisibleToTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisibleToTop(window.scrollY >= 100);

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const { palette } = useTheme();
    const mode = useAppSelector(({ palette: { mode } }) => mode);

    return (
        <>
            <Grid id={styles.main} container>
                <SubMenu />
                <Content />
            </Grid>
            {isVisibleToTop &&
                <Box id={styles.toTop} boxShadow={2}>
                    <Button variant="outlined" style={{ backgroundColor: getGreyBackgroundColor(palette, mode) }} onClick={onClick}>
                        <KeyboardArrowUp />
                    </Button>
                </Box>
            }
        </>
    );
};

export default Main;
