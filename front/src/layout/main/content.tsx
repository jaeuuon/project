import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Content = () => {
    const [isVisibleToTop, setVisibleToTop] = useState(false);

    const onClickToTop = () => window.scroll({ top: 0, behavior: 'smooth' });

    useEffect(() => {
        const handleScrollY = () => setVisibleToTop(window.scrollY >= 100 ? true : false);

        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <>
            <Grid id="grid-main-content" item xs>Main</Grid>
            {isVisibleToTop &&
                <div id="div-main-content-to-top" onClick={onClickToTop}>
                    <KeyboardArrowUpIcon />
                </div>
            }
        </>
    );
};

export default Content;
