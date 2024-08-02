import { useLocation } from 'react-router-dom';

import { Breadcrumbs as MaterialBreadcrumbs, Grid } from '@mui/material';

import { MENU } from 'constants/layout/header/menu';

import { useAppSelector } from 'hooks';

import styles from 'assets/styles/layout/main/content/breadcrumbs.module.scss';

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const roles = useAppSelector(({ user: { roles } }) => roles);

    return (
        <div id={styles.breadcrumbs}>
            {MENU.filter(({ PATH, REQUIRED: { ROLES }, SUB_MENUS }) =>
                (pathname === PATH || SUB_MENUS.some(({ PATH }) => pathname === PATH))
                && (ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code)))
            ).map(({ ICON, LABEL, SUB_MENUS }, index) =>
                <MaterialBreadcrumbs key={`breadcrumb-main-content-${index}`}>
                    <Grid className={styles.grid} container>
                        <Grid item xs="auto">{ICON}</Grid>
                        <Grid item xs="auto">{LABEL}</Grid>
                    </Grid>
                    {SUB_MENUS.filter(({ PATH, REQUIRED: { ROLES } }) =>
                        pathname === PATH
                        && (ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code)))
                    ).map(({ ICON, LABEL }, subIndex) =>
                        <Grid key={`breadcrumb-main-content-${index}-${subIndex}`} className={styles.grid} container>
                            <Grid item xs="auto">{ICON}</Grid>
                            <Grid item xs="auto">{LABEL}</Grid>
                        </Grid>
                    )}
                </MaterialBreadcrumbs>
            )}
        </div>
    );
};

export default Breadcrumbs;
