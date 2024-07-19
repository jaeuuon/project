import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

import styles from 'assets/styles/layout/header/logo.module.scss';

const Logo = () => {
    const theme = useTheme();

    return (
        <Grid id={styles.grid} item xs="auto">
            <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 886.000000 885.000000">
                <g transform="translate(0.000000,885.000000) scale(0.100000,-0.100000)" fill={theme.palette.primary.main}>
                    <path d="M962 7377 l-442 -442 0 -2953 0 -2952 440 0 440 0 0 1770 0 1770 1178 0 1177 0 448 448 447 447 0 1178 0 1177 -1623 0 -1622 0 -443 -443z m2808 -999 l0 -553 -182 -182 -183 -183 -1002 0 -1003 0 0 552 0 553 182 182 183 183 1002 0 1003 0 0 -552z" />
                    <path d="M5090 7375 l0 -445 1185 0 1185 0 0 -2323 0 -2322 -183 -183 -182 -182 -558 0 -557 0 0 445 0 445 -445 0 -445 0 0 -890 0 -890 1178 0 1177 0 448 448 447 447 0 2948 0 2947 -1625 0 -1625 0 0 -445z" />
                    <path d="M1860 4125 c0 -3 399 -700 887 -1550 l887 -1545 503 0 c277 0 503 2 503 5 0 4 -399 701 -887 1550 l-886 1545 -504 0 c-276 0 -503 -2 -503 -5z" />
                </g>
            </svg>
        </Grid>
    );
};

export default Logo;
