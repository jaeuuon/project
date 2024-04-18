import { useRef, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import Modal from '../modal';

const Sidebar = () => {
    const sidebar = useRef<HTMLInputElement>(null);

    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const onClickIcon = () => setOpenSidebar(!isOpenSidebar);

    useEffect(() => {
        document.body.style.overflow = isOpenSidebar ? 'hidden' : 'initial';
    }, [isOpenSidebar]);

    useEffect(() => {
        const handleResize = () => {
            if (sidebar?.current) {
                const styles = window.getComputedStyle(sidebar.current);

                if (styles.position !== 'fixed') {
                    setOpenSidebar(false);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isOpenSidebar &&
                <Modal setOpenSidebar={setOpenSidebar} />
            }
            <Grid id="grid-main-sidebar" className={isOpenSidebar ? 'sidebar-open' : ''} item xs="auto" ref={sidebar}>
                <div id="div-main-sidebar-content">
                    Sidebar<br />
                </div>
                <div id="div-main-sidebar-icon" onClick={onClickIcon}>
                    {isOpenSidebar ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </div>
            </Grid>
        </>
    );
};

export default Sidebar;
