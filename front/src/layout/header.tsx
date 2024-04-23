import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { Grid, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

import { Detail } from '../types/menu';

import constant from '../common/constant';
import { getCssClassByTheme } from '../common/utils';

const Header = () => {
    const theme = useTheme();

    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0 ? true : false);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div id="div-header" className={[getCssClassByTheme(theme), (isTop ? 'box-shadow-none' : '')].join(' ')}>
            <Grid id="grid-header" container>
                <Grid id="grid-header-icon" item xs="auto">
                    <img src="/logo192.png" alt="logo" />
                </Grid>
                <Grid id="grid-header-content" item xs>
                    {Object.values(constant.MENU).map((detail: Detail, index) => {
                        return (
                            <Link key={`link-header-menu-${index}`} to={detail.path}>
                                <Button startIcon={detail.icon}>
                                    <span className="span-button-label">{detail.label}</span>
                                </Button>
                            </Link>
                        );
                    })}
                </Grid>
                <Grid id="grid-header-user" item xs="auto">
                    <Button variant="outlined" startIcon={<LoginIcon />} style={{ backgroundColor: theme.palette.background.paper }}>
                        <span className="span-button-label">Login</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default Header;
