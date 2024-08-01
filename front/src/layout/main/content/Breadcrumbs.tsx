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
            {Object.values(MENU).filter(({ PATH, REQUIRED: { ROLES }, SUB_MENUS }) =>
                (pathname === PATH || SUB_MENUS.some(({ PATH: SUB_PATH }) => pathname === `${PATH}${SUB_PATH}`))
                && (ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code)))
            ).map(({ PATH, ICON, LABEL, SUB_MENUS }, index) =>
                <MaterialBreadcrumbs key={`breadcrumb-main-content-${index}`}>
                    <Grid className={styles.grid} container>
                        <Grid item xs="auto">{ICON}</Grid>
                        <Grid item xs="auto">
                            <span>{LABEL}</span>
                        </Grid>
                    </Grid>
                    {SUB_MENUS.filter(({ PATH: SUB_PATH, REQUIRED: { ROLES } }) =>
                        pathname === `${PATH}${SUB_PATH}`
                        && (ROLES.length === 0 || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code)))
                    ).map(({ ICON, LABEL }, subIndex) =>
                        <Grid key={`breadcrumb-main-content-${index}-${subIndex}`} className={styles.grid} container>
                            <Grid item xs="auto">{ICON}</Grid>
                            <Grid item xs="auto">
                                <span>{LABEL}</span>
                            </Grid>
                        </Grid>
                    )}
                </MaterialBreadcrumbs>
            )}
        </div>
    );
};

export default Breadcrumbs;
