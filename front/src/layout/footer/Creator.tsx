import { Grid, Tooltip } from '@mui/material';

import { CREATOR } from 'constants/layout/footer/creator';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/util';

import styles from 'assets/styles/layout/footer/creator.module.scss';

const onClick = () => window.open(CREATOR.URL);

const Creator = () => {
    const mode = useAppSelector(({ palette: { mode } }) => mode);

    return (
        <Grid id={styles.creator} item xs={6}>
            <p style={{ color: getGreyColor(mode) }}>
                Created by <Tooltip placement="top-start" arrow title="GitHub profile"><span onClick={onClick}>{CREATOR.NAME}</span></Tooltip>.
            </p>
        </Grid>
    );
};

export default Creator;
