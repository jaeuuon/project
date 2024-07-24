import { useTheme } from '@mui/material/styles';
import { Grid, CircularProgress } from '@mui/material';

import type Component from 'types/components/loading';

import styles from 'assets/styles/components/loading.module.scss';

const Loading = ({ isVisible }: Component) => {
    const { zIndex } = useTheme();

    return (
        <>
            {isVisible &&
                <Grid id={styles.loading} container justifyContent="center" alignItems="center" style={{ zIndex: zIndex.modal - 1 }}>
                    <Grid item xs="auto">
                        <CircularProgress />
                    </Grid>
                </Grid>
            }
        </>
    );
};

export default Loading;
