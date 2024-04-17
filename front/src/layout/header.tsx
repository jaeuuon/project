import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';

const Header = () => {
    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const handleScrollY = () => setTop(window.scrollY === 0 ? true : false);

        window.addEventListener('scroll', handleScrollY);

        return () => window.removeEventListener('scroll', handleScrollY);
    }, []);

    return (
        <div id="div-header" className={isTop ? 'box-shadow-none' : ''}>
            <Grid id="grid-header" container>
                <Grid id="grid-header-icon" item xs="auto">
                    <img src="/logo192.png" alt="logo" />
                </Grid>
                <Grid id="grid-header-content" item xs>
                    Header
                </Grid>
                <Grid id="grid-header-user" item xs="auto">
                </Grid>
            </Grid>
        </div>
    );
};

export default Header;
