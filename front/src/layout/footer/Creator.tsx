import { Grid, Tooltip } from '@mui/material';

import { creator } from 'enums/layout/footer/creator';

import styles from 'assets/styles/layout/footer/creator.module.scss';

const onClick = () => window.open(creator.URL);

const Creator = () => {
    return (
        <Grid id={styles.creator} item xs={6}>
            <p id={styles.p}>Created by <Tooltip placement="top" arrow title="GitHub profile"><span id={styles.span} onClick={onClick}>{creator.NAME}</span></Tooltip>.</p>
        </Grid>
    );
};

export default Creator;
