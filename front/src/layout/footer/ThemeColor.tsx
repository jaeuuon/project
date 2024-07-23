import { useAppSelector } from 'hooks';

import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { getGreyColor } from 'common/utils';

import styles from 'assets/styles/layout/footer/theme-color.module.scss';

const ThemeColor = () => {
    const mode = useAppSelector((state) => state.mode.value);

    const theme = useTheme();
    const themeColor = theme.palette.primary.main;

    return (
        <Grid id={styles.themeColor} item xs={6}>
            <p id={styles.p} style={{ color: getGreyColor(mode, theme) }}>
                Theme color is <span id={styles.span} style={{ backgroundColor: themeColor }}>{themeColor}</span>
            </p>
        </Grid>
    );
};

export default ThemeColor;
