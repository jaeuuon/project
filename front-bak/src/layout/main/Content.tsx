import { Grid } from '@mui/material';

import Breadcrumbs from 'layout/main/content/Breadcrumbs';
import Router from 'layout/main/content/Router';

import styles from 'assets/styles/layout/main/content.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Content = () => {
    return (
        <Grid id={styles.content} item xs>
            <div id={styles.div} className={commonStyles.positionRelative}>
                <Breadcrumbs />
                <Router />
            </div>
        </Grid>
    );
};

export default Content;
