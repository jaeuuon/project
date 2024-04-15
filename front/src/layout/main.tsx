import { useRef, useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Main = () => {
    const sidebar = useRef<HTMLInputElement>(null);

    const [isToTop, setToTop] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const onClickSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    }

    const handleScrollY = () => setToTop(window.scrollY >= 100 ? true : false);
    const handleResize = () => {
        if (sidebar?.current) {
            const styles = window.getComputedStyle(sidebar.current);

            if (styles.position !== 'fixed') {
                setSidebarOpen(false);
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
        <Grid id="grid-layout-main" container>
            <Grid id="grid-layout-main-sidebar" className={isSidebarOpen ? 'sidebar-open' : ''} item xs="auto" ref={sidebar}>
                Sidebar
                <div className="sidebar-icon" onClick={onClickSidebar}>
                    {isSidebarOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                </div>
            </Grid>
            <Grid id="grid-layout-main-content" item xs>Main</Grid>
            {isToTop &&
                <div id="div-layout-main-to-top" onClick={() => window.scroll({ top: 0, behavior: 'smooth' })}>
                    <KeyboardArrowUpIcon />
                </div>
            }
        </Grid>
    );
};

export default Main;
