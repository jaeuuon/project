import { useAppSelector } from 'hooks';

import { useTheme } from '@mui/material/styles';
import { Grid, Tooltip } from '@mui/material';

import { creator } from 'enums/layout/footer/creator';

import { getGreyColor } from 'common/utils';

import styles from 'assets/styles/layout/footer/creator.module.scss';

const onClick = () => window.open(creator.URL);

const Creator = () => {
    const mode = useAppSelector((state) => state.mode.value);

    const theme = useTheme();

    return (
        <Grid id={styles.creator} item xs={6}>
            <p id={styles.p} style={{ color: getGreyColor(mode, theme) }}>
                Created by <Tooltip placement="top" arrow title="GitHub profile"><span id={styles.span} onClick={onClick}>{creator.NAME}</span></Tooltip>.
            </p>
        </Grid>
    );
};

export default Creator;
