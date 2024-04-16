import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Sidebar from './main/sidebar';
import Content from './main/content';

const Main = () => {
    const [isVisibleToTop, setVisibleToTop] = useState(false);

    const onClickToTop = () => window.scroll({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        const handleScrollY = () => setVisibleToTop(window.scrollY >= 100 ? true : false);

        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <div id="div-main">
            <Grid id="grid-main" container>
                <Sidebar />
                <Content />
            </Grid>
            {isVisibleToTop &&
                <div id="div-main-to-top" onClick={onClickToTop}>
                    <KeyboardArrowUpIcon />
                </div>
            }
        </div>
    );
};

export default Main;
