import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Button } from '@mui/material';

import { group } from 'enums/layout/header/menu';

import { useAppSelector } from 'hooks';

import styles from 'assets/styles/layout/header/menu.module.scss';
import headerStyles from 'assets/styles/layout/header.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Menu = () => {
    const roles = useAppSelector((state) => state.user.roles);
    const navigate = useNavigate();

    const className = [styles.button, headerStyles.button].join(' ');

    return (
        <Grid id={styles.menu} item xs>
            {Object.values(group).filter(({ VISIBLE }) => VISIBLE).map(({ PATH, ICON, LABEL, REQUIRED }, index) => {
                const { ROLES } = REQUIRED;

                return (
                    <Fragment key={`button-header-menu-${index}`}>
                        {(ROLES.length === 0
                            || ROLES.some((ROLE) => roles.some(({ code }) => ROLE === code))
                        ) &&
                            <Button className={className} startIcon={ICON} onClick={() => navigate(PATH)}>
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
