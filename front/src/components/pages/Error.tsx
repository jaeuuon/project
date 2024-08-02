import { memo } from 'react';

import { Alert } from '@mui/material';

import type Component from 'types/components/pages/error';

import styles from 'assets/styles/components/pages/error.module.scss';

const Error = ({ code, message }: Component) => {
    return (
        <>
            {code && message &&
                <Alert id={styles.error} severity="error">
                    <p>{message}</p>
                    <p>[{code}]</p>
                </Alert>
            }
        </>
    );
};

export default memo(Error);
