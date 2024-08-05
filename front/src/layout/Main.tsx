import { Grid } from '@mui/material';

import SubMenu from 'layout/main/SubMenu';
import Content from 'layout/main/Content';
import ToTop from 'layout/main/ToTop';

import styles from 'assets/styles/layout/main.module.scss';

const Main = () =>
    <>
        <Grid id={styles.main} container>
            <SubMenu />
            <Content />
        </Grid>
        <ToTop />
    </>
;

export default Main;
