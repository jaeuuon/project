import { useTheme } from '@mui/material/styles';
import { Grid, CircularProgress } from '@mui/material';

import type LoadingType from 'types/components/loading';

import styles from 'assets/styles/components/loading.module.scss';

const Loading = ({ isVisible }: LoadingType) => {
    const theme = useTheme();

    return (
        <>
            {isVisible &&
                <Grid id={styles.loading} container justifyContent="center" alignItems="center" style={{ zIndex: theme.zIndex.modal - 1 }}>
                    <Grid item xs="auto">
                        <CircularProgress />
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default Loading;
