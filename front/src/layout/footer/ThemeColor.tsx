import { useTheme, Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/util';

import styles from 'assets/styles/layout/footer/theme-color.module.scss';

const ThemeColor = () => {
    const { palette: { primary: { main } } } = useTheme();
    const mode = useAppSelector(({ palette: { mode } }) => mode);

    return (
        <Grid id={styles.themeColor} item xs={6}>
            <p style={{ color: getGreyColor(mode) }}>
                Theme color is <span style={{ backgroundColor: main }}>{main}</span>
            </p>
        </Grid>
    );
};

export default ThemeColor;
