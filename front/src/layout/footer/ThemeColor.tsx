import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/utils';

import styles from 'assets/styles/layout/footer/theme-color.module.scss';

const ThemeColor = () => {
    const { palette } = useTheme();
    const mode = useAppSelector((state) => state.mode.value);

    const color = palette.primary.main;

    return (
        <Grid id={styles.themeColor} item xs={6}>
            <p id={styles.p} style={{ color: getGreyColor(palette, mode) }}>
                Theme color is <span id={styles.span} style={{ backgroundColor: color }}>{color}</span>
            </p>
        </Grid>
    );
};

export default ThemeColor;
