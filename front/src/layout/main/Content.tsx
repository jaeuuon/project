import { Grid } from '@mui/material';

import Breadcrumbs from 'layout/main/content/Breadcrumbs';
import Router from 'layout/main/content/Router';

import styles from 'assets/styles/layout/main/content.module.scss';

const Content = () =>
    <Grid id={styles.content} item xs>
        <Breadcrumbs />
        <Router />
    </Grid>
;

export default Content;
