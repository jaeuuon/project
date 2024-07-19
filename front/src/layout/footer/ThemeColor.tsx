import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import styles from 'assets/styles/layout/footer/theme-color.module.scss';

const ThemeColor = () => {
    const theme = useTheme();
    const themeColor = theme.palette.primary.main;

    return (
        <Grid id={styles.themeColor} item xs={6}>
            <p id={styles.p}>Theme color is <span id={styles.span} style={{ backgroundColor: themeColor }}>{themeColor}</span></p>
        </Grid>
    );
};

export default ThemeColor;
