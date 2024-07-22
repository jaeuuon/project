import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

import type LoadingType from 'types/components/loading';

import styles from 'assets/styles/components/loading.module.scss';

const Loading = ({ isVisible }: LoadingType) => {
    const theme = useTheme();

    return (
        <>
            {isVisible &&
                <div id={styles.loading} style={{ zIndex: theme.zIndex.modal - 1 }}>
                    <CircularProgress />
                </div>
            }
        </>
    );
};

export default Loading;
