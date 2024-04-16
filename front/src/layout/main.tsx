import { useRef, useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Main = ({
    isOpenSidebar, handleSidebar
}: {
    isOpenSidebar: boolean; handleSidebar: (isOpenSidebar: boolean) => void;
}) => {
    const sidebar = useRef<HTMLInputElement>(null);

    const [isToTop, setToTop] = useState(false);

    const onClickIcon = () => handleSidebar(!isOpenSidebar);
    const onClickToTop = () => window.scroll({ top: 0, behavior: 'smooth' });

    const handleScrollY = () => setToTop(window.scrollY >= 100 ? true : false);
    const handleResize = () => {
        if (sidebar?.current) {
            const styles = window.getComputedStyle(sidebar.current);

            if (styles.position !== 'fixed') {
                handleSidebar(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScrollY);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScrollY);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <div id="div-main">
            <Grid id="grid-main" container>
                <Grid id="grid-main-sidebar" className={isOpenSidebar ? 'sidebar-open' : ''} item xs="auto" ref={sidebar}>
                    Sidebar
                    <div id="sidebar-icon" onClick={onClickIcon}>
                        {isOpenSidebar ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                    </div>
                </Grid>
                <Grid id="grid-main-content" item xs>Main</Grid>
                {isToTop &&
                    <div id="div-main-to-top" onClick={onClickToTop}>
                        <KeyboardArrowUpIcon />
                    </div>
                }
            </Grid>
        </div>
    );
};

export default Main;
