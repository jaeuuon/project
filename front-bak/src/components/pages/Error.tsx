import { Alert } from '@mui/material';

import type Component from 'types/components/error';

import styles from 'assets/styles/components/error.module.scss';
import commonStyles from 'assets/styles/common.module.scss';

const Error = ({ codeMessage }: Component) => {
    return (
        <>
            {codeMessage &&
                <Alert id={styles.error} severity="error">
                    <p className={commonStyles.wordKeep}>{codeMessage.message}</p>
                    <p className={commonStyles.wordBreak}>[{codeMessage.code}]</p>
                </Alert>
            }
        </>
    );
};

export default Error;
