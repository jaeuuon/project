import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Sidebar from 'layout/main/Sidebar';
import Content from 'layout/main/Content';

import { getCssClassByTheme, getBorderColor } from 'common/utils';

const onClick = () => window.scroll({ top: 0, behavior: 'smooth' });

const Main = () => {
    const theme = useTheme();

    const [isVisibleToTop, setVisibleToTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisibleToTop(window.scrollY >= 100 && true);

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
                <div id="div-main-to-top" className={getCssClassByTheme(theme)} style={{ borderColor: getBorderColor(theme) }} onClick={onClick}>
                    <KeyboardArrowUpIcon />
                </div>
            }
        </div>
    );
};

export default Main;
