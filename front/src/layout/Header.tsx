import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { getCssClassByTheme, getBorderColor } from 'common/utils';

import Icon from 'layout/header/Icon';
import Menu from 'layout/header/Menu';
import User from 'layout/header/User';
import Mode from 'layout/header/Mode';

const Header = () => {
    const theme = useTheme();
    const borderColor = getBorderColor(theme);

    const [isTop, setTop] = useState(true);

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0 && true);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <>
            <div id="layout-header" className={[getCssClassByTheme(theme), (isTop ? 'box-shadow-none' : '')].join(' ')} style={{ borderColor }}>
                <Grid id="layout-header-grid" container>
                    <Icon />
                    <Menu />
                    <Grid id="layout-header-grid-user-and-mode" item xs="auto">
                        <User />
                        <Mode />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Header;
