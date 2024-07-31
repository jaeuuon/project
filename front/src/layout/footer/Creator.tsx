import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip } from '@mui/material';

import { CREATOR } from 'constants/layout/footer/creator';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/util';

import styles from 'assets/styles/layout/footer/creator.module.scss';

const onClick = () => window.open(CREATOR.URL);

const Creator = () => {
    const { palette } = useTheme();
    const { mode } = useAppSelector((state) => state.palette);

    return (
        <Grid id={styles.creator} item xs={6}>
            <p style={{ color: getGreyColor(palette, mode) }}>
                Created by <Tooltip placement="top" arrow title="GitHub profile"><span onClick={onClick}>{CREATOR.NAME}</span></Tooltip>.
            </p>
        </Grid>
    );
};

export default Creator;
