import { CircularProgress } from '@mui/material';

import type LoadingType from 'types/components/loading';

import styles from 'assets/styles/components/loading.module.scss';

const Loading = ({ isVisible }: LoadingType) => {
    return (
        <>
            {isVisible &&
                <div id={styles.loading}>
                    <CircularProgress />
                </div>
            }
        </>
    );
};

export default Loading;
