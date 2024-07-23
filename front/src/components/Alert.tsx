import { Alert as MaterialAlert } from '@mui/material';

import type AlertType from 'types/components/alert';

import styles from 'assets/styles/components/alert.module.scss';

const Alert = ({
    severity, setVisibleFalse
}: AlertType) => {
    return (
        <MaterialAlert severity={severity} onClose={setVisibleFalse}>
            <p id={styles.keep}>{codeMessage.message}</p>
            {severity === 'error' &&
                <p id={styles.break}>[{codeMessage.code}]</p>
            }
        </MaterialAlert>
    );
};

export default Alert;
