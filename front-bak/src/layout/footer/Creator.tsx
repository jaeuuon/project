import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip } from '@mui/material';

import { creator } from 'enums/layout/footer/creator';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/utils';

import styles from 'assets/styles/layout/footer/creator.module.scss';

const onClick = () => window.open(creator.URL);

const Creator = () => {
    const { palette } = useTheme();
    const mode = useAppSelector((state) => state.mode.value);

    return (
        <Grid id={styles.creator} item xs={6}>
            <p id={styles.p} style={{ color: getGreyColor(palette, mode) }}>
                Created by <Tooltip placement="top" arrow title="GitHub profile"><span id={styles.span} onClick={onClick}>{creator.NAME}</span></Tooltip>.
            </p>
        </Grid>
    );
};

export default Creator;
