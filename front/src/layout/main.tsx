import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Sidebar from './main/sidebar';
import Content from './main/content';

import { getCssClassByTheme } from '../common/utils';

const Main = () => {
    const theme = useTheme();

    const [isVisibleToTop, setVisibleToTop] = useState(false);

    const onClick = () => window.scroll({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        const onScroll = () => setVisibleToTop(window.scrollY >= 100 ? true : false);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div id="div-main">
            <Grid id="grid-main" container>
                <Sidebar />
                <Content />
            </Grid>
            {isVisibleToTop &&
                <div id="div-main-to-top" className={getCssClassByTheme(theme)} onClick={onClick}>
                    <KeyboardArrowUpIcon />
                </div>
            }
        </div>
    );
};

export default Main;
