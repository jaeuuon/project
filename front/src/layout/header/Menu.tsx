import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

import { group } from 'enums/layout/header/menu';

import { useAppSelector } from 'hooks';

import styles from 'assets/styles/layout/header/menu.module.scss';
import headerStyles from 'assets/styles/layout/header.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Menu = () => {
    const navigate = useNavigate();

    const roles = useAppSelector((state) => state.user.roles);

    const buttonClassNames = [styles.button, headerStyles.button];

    return (
        <Grid id={styles.grid} item xs>
            {Object.values(group).filter(({ VISIBLE }) => VISIBLE).map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                const requiredRoles = REQUIRED.ROLES;

                return (
                    <Fragment key={`button-header-menu-${index}`}>
                        {(requiredRoles.length === 0
                            || requiredRoles.some((requiredRole) => roles.some(({ code }) => requiredRole === code))
                        ) &&
                            <Button className={buttonClassNames.join(' ')} startIcon={ICON} onClick={() => navigate(PATH)}>
                                <span className={commonStyles.displayNoneMd}>{LABEL}</span>
                            </Button>
                        }
                    </Fragment>
                );
            })}
        </Grid>
    );
};

export default Menu;
