import { useState, useEffect } from 'react';

import { useAppSelector } from 'hooks';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import { getBorderColor, getBackgroundColor } from 'common/utils';

import Sidebar from 'layout/main/Sidebar';
import Content from 'layout/main/Content';

import styles from 'assets/styles/layout/main.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const onClick = () => window.scroll({ top: 0, behavior: 'smooth' });

const Main = () => {
    const [isVisibleToTop, setVisibleToTop] = useState(false);

    const mode = useAppSelector((state) => state.mode.value);

    const theme = useTheme();

    useEffect(() => {
        const onScroll = () => setVisibleToTop(window.scrollY >= 100 && true);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <Grid id={styles.main} container>
                <Sidebar />
                <Content />
            </Grid>
            {isVisibleToTop &&
                <Grid id={styles.toTop} container justifyContent="center" alignItems="center" boxShadow={2}
                    style={{ borderColor: getBorderColor(theme), backgroundColor: getBackgroundColor(mode, theme) }}
                    onClick={onClick}
                >
                    <Grid item xs="auto">
                        <KeyboardArrowUp className={commonStyles.displayBlock} />
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default Main;
