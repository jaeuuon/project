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

import styles from 'assets/styles/layout/header.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Header = () => {
    const [isTop, setTop] = useState(true);

    const mode = useAppSelector((state) => state.mode.value);

    const theme = useTheme();
    const classNames = [getBackgroundColorClass(mode)];

    if (!isTop) {
        classNames.push(commonStyles.boxShadow);
    }

    const style = { zIndex: theme.zIndex.appBar, borderColor: getBorderColor(theme) };

    useEffect(() => {
        const onScroll = () => setTop(window.scrollY === 0 && true);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div id={styles.div} className={classNames.join(' ')} style={style}>
            <Grid id={styles.grid} container>
                <Sidebar />
                <Logo />
                <Menu />
                <User />
                <Mode />
            </Grid>
        </div>
    );
};

export default Header;
