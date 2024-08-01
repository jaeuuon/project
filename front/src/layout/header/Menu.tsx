import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

import { MENUS } from 'constants/layout/header/menu';

import { useAppSelector } from 'hooks';

import styles from 'assets/styles/layout/header/menu.module.scss';

const Menu = () => {
    const roles = useAppSelector(({ user: { roles } }) => roles);
    const navigate = useNavigate();

    return (
        <Grid id={styles.menu} item xs>
            {MENUS.filter(({ VISIBLE, REQUIRED: { ROLES } }) =>
                VISIBLE && (
                    ROLES.length === 0
                    || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code))
                )
            ).map(({ PATH, ICON, LABEL }, index) =>
                <Button key={`button-header-menu-${index}`} startIcon={ICON} onClick={() => navigate(PATH)}>
                    <span>{LABEL}</span>
                </Button>
            )}
        </Grid>
    );
};

export default Menu;
