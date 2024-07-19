import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getBackgroundColorClass, getBorderColor } from 'common/utils';

import Logo from 'layout/header/Logo';
import Sidebar from 'layout/header/Sidebar';
import Menu from 'layout/header/Menu';
import User from 'layout/header/User';
import Mode from 'layout/header/Mode';

const Header = () => {
    const [isTop, setTop] = useState(true);

    const mode = useAppSelector((state) => state.mode);

    const theme = useTheme();
    const className = [getBackgroundColorClass(mode), 'backdrop-filter-blur', (!isTop ? 'box-shadow' : '')].join(' ');

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0 && true);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div id="layout-header" className={className} style={{ zIndex: theme.zIndex.appBar, borderColor: getBorderColor(theme) }}>
            <Grid id="layout-header-grid" container>
                <Grid id="layout-header-grid-logo" item xs="auto">
                    <Logo />
                </Grid>
                <Sidebar />
                <Menu />
                <User />
                <Mode />
            </Grid>
        </div>
    );
};

export default Header;
