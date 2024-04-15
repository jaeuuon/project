import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Main = () => {
    const [isToTop, setToTop] = useState(false);

    const toTop = () => window.scroll({ top: 0, behavior: 'smooth' });

    const handleScrollY = () => setToTop(window.scrollY >= 100 ? true : false);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <div id="div-layout-main">
            <Grid id="grid-layout-main" container>
                <Grid id="grid-layout-main-sidebar" item xs="auto">Sidebar</Grid>
                <Grid item xs>Main</Grid>
                {isToTop &&
                    <Fab id="fab-layout-main-to-top" size="small" onClick={toTop}>
                        <KeyboardArrowUpIcon />
                    </Fab>
                }
            </Grid>
        </div>
    );
};

export default Main;
