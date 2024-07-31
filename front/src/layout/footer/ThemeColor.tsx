import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { useAppSelector } from 'hooks';

import { getGreyColor } from 'common/util';

import styles from 'assets/styles/layout/footer/theme-color.module.scss';

const ThemeColor = () => {
    const { palette } = useTheme();
    const { mode } = useAppSelector(({ palette }) => palette);

    const { primary: { main } } = palette;

    return (
        <Grid id={styles.themeColor} item xs={6}>
            <p style={{ color: getGreyColor(palette, mode) }}>
                Theme color is <span style={{ backgroundColor: main }}>{main}</span>
            </p>
        </Grid>
    );
};

export default ThemeColor;
