import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import { getBorderColor } from 'common/util';

import Creator from 'layout/footer/Creator';
import ThemeColor from 'layout/footer/ThemeColor';
import Skills from 'layout/footer/Skills';

import styles from 'assets/styles/layout/footer.module.scss';

const Footer = () => {
    const { palette } = useTheme();

    return (
        <div id={styles.footer} style={{ borderColor: getBorderColor(palette) }}>
            <Grid container>
                <Creator />
                <ThemeColor />
                <Skills />
            </Grid>
        </div>
    );
};

export default Footer;
