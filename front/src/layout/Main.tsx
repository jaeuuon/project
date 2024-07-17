import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';

import type { RootState } from 'types/modules';

import { getBackgroundColorClass, getBorderColor } from 'common/utils';

import Sidebar from 'layout/main/Sidebar';
import Content from 'layout/main/Content';

const onClick = () => window.scroll({ top: 0, behavior: 'smooth' });

const Main = () => {
    const [isVisibleToTop, setVisibleToTop] = useState(false);

    const mode = useSelector((state: RootState) => state.mode);

    const theme = useTheme();
    const className = [getBackgroundColorClass(mode), 'border-radius', 'backdrop-filter-blur', 'box-shadow'].join(' ');

    useEffect(() => {
        const onScroll = () => setVisibleToTop(window.scrollY >= 100 && true);

        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div id="layout-main">
            <Grid id="layout-main-grid" container>
                <Sidebar />
                <Content />
            </Grid>
            {isVisibleToTop &&
                <div id="layout-main-to-top" className={className} style={{ borderColor: getBorderColor(theme) }} onClick={onClick}>
                    <KeyboardArrowUp />
                </div>
            }
        </div>
    );
};

export default Main;
