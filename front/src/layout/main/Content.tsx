import { useLocation } from 'react-router-dom';

import { useAppSelector } from 'hooks';

import { Grid } from '@mui/material';

import { group } from 'enums/layout/header/menu';
import { groups } from 'enums/layout/main/sidebar';

import Breadcrumbs from 'layout/main/content/Breadcrumbs';
import Router from 'layout/main/content/Router';

import styles from 'assets/styles/layout/main/content.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Content = () => {
    const { pathname } = useLocation();

    const { isInit, roles } = useAppSelector((state) => state.user);

    const isRequiredInit = Object.values(group).some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT)
        || groups.some(({ ITEMS }) => ITEMS.some(({ PATH, REQUIRED }) => PATH === pathname && REQUIRED.INIT));

    return (
        <Grid id={styles.content} item xs>
            <div id={styles.div} className={commonStyles.positionRelative}>
                <Breadcrumbs isInit={isInit} roles={roles} isRequiredInit={isRequiredInit} />
                <Router isInit={isInit} roles={roles} isRequiredInit={isRequiredInit} />
            </div>
        </Grid>
    );
};

export default Content;
