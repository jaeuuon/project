import { memo } from 'react';

import { Alert } from '@mui/material';

import type Component from 'types/components/pages/error';

import styles from 'assets/styles/components/pages/error.module.scss';
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

export default memo(Error);
