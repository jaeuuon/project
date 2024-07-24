import { Alert as MaterialAlert } from '@mui/material';

import type Component from 'types/components/alert';

import styles from 'assets/styles/components/alert.module.scss';

const Alert = ({
    severity, codeMessage, setVisibleFalse
}: Component) => {
    return (
        <>
            {codeMessage &&
                <MaterialAlert severity={severity} onClose={setVisibleFalse}>
                    <p id={styles.keep}>{codeMessage.message}</p>
                    {severity === 'error' &&
                        <p id={styles.break}>[{codeMessage.code}]</p>
                    }
                </MaterialAlert>
            }
        </>
    );
};

export default Alert;
