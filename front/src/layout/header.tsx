import { useState, useEffect } from 'react';

import { Grid, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import constant from '../constant';
import { Detail } from '../types/menu';

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
                    {Object.values(constant.MENU).map((detail: Detail, index) => {
                        return (
                            <Button key={`button-header-menu-${index}`} startIcon={detail.icon}>
                                <span className="span-button-label">{detail.label}</span>
                            </Button>
                        );
                    })}
                </Grid>
                <Grid id="grid-header-user" item xs="auto">
                    <Button variant="outlined" startIcon={<LoginIcon />}>
                        <span className="span-button-label">Login</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Header;
